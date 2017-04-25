from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import argparse

class Main:

   # def __init__(self):
        # print('inizializzazione')

    #def monitor_routine(self):
        #query db to get info.


    def bootstrap(self):
        parser = argparse.ArgumentParser(description='Start the web scraper looking for the search term passed. It expects 1 arg: search_term:  -s str')
        parser.add_argument("-s", "--search_term",
                          dest="search_term",
                          help="string to be searched")

        args = parser.parse_args()

        process = CrawlerProcess(get_project_settings())

        # 'subito' is the name of one of the spiders of the project.
        items = process.crawl('subito', search_term=args.search_term)
        process.start() # the script will block here until the crawling is finished

        print("###END###")
        # print(type(items))
        # print(items)
        # run monitoring informations
        # self.monitor_routine()


if __name__ == '__main__':
    main = Main()
    main.bootstrap()
