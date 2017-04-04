# -*- coding: utf-8 -*-
import scrapy
import logging

from scrapy.loader import ItemLoader
from progetto_90_scrapy.items import SubitoSingleItemList
import datetime as datetime

class SubitoScaperSpider(scrapy.Spider):
    name = "subito"
    allowed_domains = ["subito.it"]

    current_date = (datetime.datetime.today()).replace(hour=0, minute=0, second=0, microsecond=0)

    def start_requests(self):
        urls = [
            'http://www.subito.it/annunci-italia/vendita/moto-e-scooter/?q=bmw+ninet',
            'http://www.subito.it/annunci-italia/vendita/moto-e-scooter/?q=bmw+f800gs'
            ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    #start_urls = ['http://www.subito.it/annunci-italia/vendita/moto-e-scooter/?q=bmw+ninet']

    def parse(self, response):
        listing = response.css('ul.items_listing')
        logging.debug('Elementi nel listato: {0}'.format(len(listing), '>20'))
        current_item = SubitoSingleItemList()
        query = response.css('#searchtext::attr(value)').extract_first()
        for el in listing.css('li'):
            current_item['query'] = query
            current_item['name'] = el.css('article::attr(data-id)').extract_first()
            item_desc = el.css('div.item_description')
            current_item['category'] = item_desc.css('span.item_category::text').extract_first()
            current_item['title'] = item_desc.css('h2>a::attr(title)').extract_first()
            current_item['link'] = item_desc.css('h2>a::attr(href)').extract_first()
            current_item['price'] = item_desc.css('span.item_price::text').extract_first()
            current_item['date_scraped'] = self.current_date
            item_info_motor = item_desc.css('span.item_info_motori')
            current_item['date_published'] = item_info_motor.css('time::attr(datetime)').extract_first()
            current_item['location'] = item_info_motor.css('span.item_location').css('em.item_city::text').extract_first()

            item_motor = item_desc.css('span.item_motori')
            current_item['year'] = item_motor.css('div.item_regdate>p::text')[1].extract()

            mileage = None
            try:
                #'15.000' -> 15000
                mileage = [int(item_motor.css('div.item_mileage>p::text')[1].extract().replace('.', ''))]
                mileage.append(int(item_motor.css('div.item_mileage>p::text')[2].extract().replace('.', '')))
            except IndexError as e:
                pass

            current_item['mileage'] = mileage#', '.join(mileage) if len(mileage) > 1 else mileage[0]

            yield current_item
            # yield {
            #     'category': desc.css('span.item_category::text').extract_first(),
            #     'title': desc.css('h2>a::attr(title)').extract_first(),
            #     'name': desc.css('h2>a::attr(name)').extract_first(),
            #     'link': desc.css('h2>a::attr(href)').extract_first(),
            # }

        next_page = response.css('div.pagination_next>a::attr(href)').extract_first()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
