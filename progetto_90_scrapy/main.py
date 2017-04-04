from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

class Main:

    def __init__(self):
        print('inizializzazione')

    #def monitor_routine(self):
        #query db to get info.


    def bootstrap(self):
        process = CrawlerProcess(get_project_settings())

        # 'subito' is the name of one of the spiders of the project.
        items = process.crawl('subito')
        process.start() # the script will block here until the crawling is finished

        # print(type(items))
        # print(items)
        # run monitoring informations
        # self.monitor_routine()


if __name__ == '__main__':
    main = Main()
    main.bootstrap()
