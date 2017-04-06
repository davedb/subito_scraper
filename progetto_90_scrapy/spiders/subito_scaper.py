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
            #'http://www.subito.it/annunci-italia/vendita/usato/?q=bmw+ninet',
            #'http://www.subito.it/annunci-italia/vendita/usato/?q=bmw+f800gs'
            ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    #start_urls = ['http://www.subito.it/annunci-italia/vendita/moto-e-scooter/?q=bmw+ninet']

    def parse(self, response):
        listing = response.css('ul.items_listing > li')
        logging.debug('Elementi nel listato: {0}'.format(len(listing), '>20'))

        query = response.css('#searchtext::attr(value)').extract_first()
        for el in listing:
            current_item = SubitoSingleItemList()
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

            item_motor_list = item_desc.css('.item_extra_data > ul')

            for sub_el in item_motor_list.css('li'):
                c_value = sub_el.css('li::text').extract_first()
                if c_value:
                    # mileage field
                    if c_value.lower().find('km') >= 0:
                        current_item['mileage'] = c_value
                    else:
                        current_item['year'] = c_value

            yield current_item


        next_page = response.css('div.pagination_next>a::attr(href)').extract_first()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
