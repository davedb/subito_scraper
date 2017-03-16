# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html


class Progetto90ScrapyPipeline(object):
    def process_item(self, item, spider):
        return item


import pymongo
from datetime import datetime
from scrapy.exceptions import DropItem

class CheckElementIsDuplicate(object):

    def __init__(self):
        self.ids_seen = set()

    def process_item(self,item,spider):
        if item['name'] in self.ids_seen:
            raise DropItem("Duplicate item found: %s" % item)
        else:
            self.ids_seen.add(item['name'])
            return item

class CheckItemValuesPipeline(object):

    # @classmethod
    # def from_crawler(cls, crawler):
    #     return cls(
    #         mongo_uri=crawler.settings.get('MONGO_URI'),
    #         mongo_db=crawler.settings.get('MONGO_DATABASE', 'items')
    #     )

    def process_item(self, item, spider):
        # check category
        if item['category']:
            if item['category'] != 'Moto e Scooter':
                raise DropItem("Item category is not Moto e Scooter".format(item))
        else:
            raise DropItem("Missing category in {0}".format(item))
        #check and polish price
        if item['price']:
            # let's transform price written: 6.999 € in 6999
            item['price'] = item['price'].split(' ')[0].replace('.', '')
            if float(item['price']) < 5000:
                raise DropItem("Price too low in {0}".format(item))
        else:
            raise DropItem("Missing price in {0}".format(item))
        #check and polish date_published
        if item['date_published']:
            if item['date_published'] == None:
                raise DropItem("date_published not valid in {0}".format(item))
            else:
                item['date_published'] = datetime.strptime(item['date_published'].split(' ')[0], "%Y-%m-%d")
        else:
            raise DropItem("Missing date_published in {0}".format(item))

        #check and polish location
        if item['location']:
            item['location'] = item['location'].replace('(', '').replace(')','')
        else:
            raise DropItem("Missing location in {0}".format(item))

        return item

class MongoPipeline(object):

    collection_name = 'scrapy_items'

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE', 'items')
        )

    def open_spider(self, spider):
        #self.client = pymongo.MongoClient(self.mongo_uri)
        self.client = pymongo.MongoClient(self.mongo_uri, 27017)
        try:
            self.client['admin'].authenticate('davide', 'laCucc4r4cia', mechanism='SCRAM-SHA-1')
            self.db = self.client[self.mongo_db]
        except Exception as e:
            print('mongo db auth error %s' % e)
            #return self
        #self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):

        cursor = self.db[self.collection_name].find({'name':dict(item)['name']})

        if cursor.count() == 0:
            print(dict(item)['name'])
            print('New Doc! : {0}'.format(cursor.count()))
            self.db[self.collection_name].insert(dict(item))
        else:
            # update date_scraped
            # print('Numero duplicati: {0}'.format(cursor.count()))
            self.db[self.collection_name].update_one(
                {'name': dict(item)['name']},
                { '$set':{
                    'price': dict(item)['price'],
                    'date_scraped': dict(item)['date_scraped'],
                    'date_published': dict(item)['date_published'],
                    'location': dict(item)['location'],
                    'year': dict(item)['year'],
                    'mileage': dict(item)['mileage']
                    }
                }
            )

        cursor.close()
        return item
