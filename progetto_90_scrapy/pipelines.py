# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
from datetime import datetime
from scrapy.exceptions import DropItem
import re
from difflib import SequenceMatcher
import Levenshtein

class Progetto90ScrapyPipeline(object):
    def process_item(self, item, spider):
        return item

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

    regex_mileage = r"(\d+)\.?(\d+)?\skm\s?-\s(\d+)\.?(\d+)?"
    # @classmethod
    # def from_crawler(cls, crawler):
    #     return cls(
    #         mongo_uri=crawler.settings.get('MONGO_URI'),
    #         mongo_db=crawler.settings.get('MONGO_DATABASE', 'items')
    #     )

    def process_item(self, item, spider):

        MINIMUM_PRICE_VALUE = 1

        # check title matches query
        if item['title']:
            # query = item['query']
            # regex_digit = r"\d+"
            # digit_in_query = re.finditer(query, regex_digit, re.IGNORECASE)
            # if digit_in_query:
            #     digit_in_query
            #
            #
            # query_list = item['query'].split(' ')

            # for q in query_list:
            #     current_query = q.lower()

            t = item['title'][:len(item['query'])]

            r = SequenceMatcher(None, item['title'], item['query']).ratio()
            rL =  SequenceMatcher(None, t, item['query']).ratio()
            if rL < .25:
                raise DropItem("Item is not what you're looking for {0}".format(item))
            #rL = Levenshtein.ratio(item['title'], item['query'])
                # print('Ratio between title ({0}) and query ({1}): {2}'.format(item['title'], item['query'], r) )
                # print('Ratio between t ({0}) and query ({1}): {2}'.format(t, item['query'], rL) )
        else:
            raise DropItem("Missing title in {0}".format(item))

        # check category
        if item['category']:
            if item['category'] != 'Moto e Scooter':
                pass
                #raise DropItem("Item category is not Moto e Scooter".format(item))
        else:
            pass
            #raise DropItem("Missing category in {0}".format(item))
        #check and polish price
        if item['price']:
            # let's transform price written: 6.999 € in 6999
            item['price'] = item['price'].split(' ')[0].replace('.', '')
            if float(item['price']) < MINIMUM_PRICE_VALUE:
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

        # check and polish mileage
        if item['mileage']:
            mileage = item['mileage']
            match_mileage = re.search(self.regex_mileage, mileage)
            if match_mileage != None:
                val_1 = match_mileage.groups()[0] + match_mileage.groups()[1] if match_mileage.groups()[1] else match_mileage.groups()[0]
                val_2 = match_mileage.groups()[2] + match_mileage.groups()[3] if match_mileage.groups()[3] else match_mileage.groups()[2]
                print(val_1, val_2)
                mileage_arr = [int(val_1), int(val_2)]
                item['mileage'] = mileage_arr

        # check and polish year
        if item['year']:
            item['year'] = int(item['year'])

        return item

class PrintItemsToJson(object):

    def process_item(self, item, spider):
        print(dict(item))
        return item

class MongoPipeline(object):

    collection_name = 'scrapy_items'

    def __init__(self, mongo_uri, mongo_db, mongo_secret):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        f = open(mongo_secret, 'r')
        ulist = f.read().split(',')
        self.mongo_u = ulist[0].strip()
        self.mongo_p = ulist[1].strip()
        f.close()

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI'),
            mongo_db=crawler.settings.get('MONGO_DATABASE', 'items'),
            mongo_secret=crawler.settings.get('MONGO_SECRET')
        )

    def open_spider(self, spider):

        #self.client = pymongo.MongoClient(self.mongo_uri)
        self.client = pymongo.MongoClient(self.mongo_uri, 27017)
        try:
            self.client['admin'].authenticate(self.mongo_u, self.mongo_p, mechanism='SCRAM-SHA-1')
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
            #print(dict(item)['name'])
            #print('New Doc! : {0}'.format(cursor.count()))
            self.db[self.collection_name].insert(dict(item))
        else:
            # update date_scraped
            # print('Numero duplicati: {0}'.format(cursor.count()))
            self.db[self.collection_name].update_one(
                {'name': dict(item)['name']},
                { '$set':{
                    'query': dict(item)['query'],
                    'price': dict(item)['price'],
                    'date_scraped': dict(item)['date_scraped'],
                    'location': dict(item)['location'],
                    'year': dict(item)['year'],
                    'mileage': dict(item)['mileage']
                    }
                }
            )

        cursor.close()
        return item
