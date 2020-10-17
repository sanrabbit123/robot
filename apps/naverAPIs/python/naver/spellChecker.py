import requests
import json
import time
import sys
from collections import OrderedDict
import xml.etree.ElementTree as ET
from collections import namedtuple

CheckedMother = namedtuple('Checked', ['result', 'original', 'checked', 'errors', 'words', 'time'])

class Checked(CheckedMother):
    def __new__(cls, result=False, original='', checked='', errors=0, words=[], time=0.0):
        return super(Checked, cls).__new__(cls, result, original, checked, errors, words, time)

    def as_dict(self):
        d = {
            'result': self.result,
            'original': self.original,
            'checked': self.checked,
            'errors': self.errors,
            'words': self.words,
            'time': self.time,
        }
        return d

class SpellChecker:

    def __init__(self, text):
        self.text = text
        self.PASSED = 0
        self.WRONG_SPELLING = 1
        self.WRONG_SPACING = 2
        self.AMBIGUOUS = 3
        self.STATISTICAL_CORRECTION = 4
        self.base_url = 'https://m.search.naver.com/p/csearch/ocontent/spellchecker.nhn'

    def removeTags(self, html):
        html = u'<content>{}</content>'.format(html).replace('<br>','')
        result = ''.join(ET.fromstring(html).itertext())
        return result

    def check(self):
        if isinstance(self.text, list):
            result = []
            for item in self.text:
                checked = self.check(item)
                result.append(checked)
            return result

        if len(self.text) > 500:
            return Checked(result=False)

        payload = {
            '_callback': 'window.__jindo2_callback._spellingCheck_0',
            'q': self.text
        }
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
            'referer': 'https://search.naver.com/',
        }

        start_time = time.time()
        r = requests.Session().get(self.base_url, params=payload, headers=headers)
        passed_time = time.time() - start_time

        r = r.text[42:-2]

        data = json.loads(r)
        html = data['message']['result']['html']
        result = {
            'result': True,
            'original': self.text,
            'checked': self.removeTags(html),
            'errors': data['message']['result']['errata_count'],
            'time': passed_time,
            'words': OrderedDict(),
        }

        html = html.replace('<span class=\'green_text\'>', '<green>').replace('<span class=\'red_text\'>', '<red>').replace('<span class=\'purple_text\'>', '<purple>').replace('<span class=\'blue_text\'>', '<blue>').replace('</span>', '<end>')
        items = html.split(' ')
        words = []
        tmp = ''
        for word in items:
            if tmp == '' and word[:1] == '<':
                pos = word.find('>') + 1
                tmp = word[:pos]
            elif tmp != '':
                word = u'{}{}'.format(tmp, word)

            if word[-5:] == '<end>':
                word = word.replace('<end>', '')
                tmp = ''

            words.append(word)

        for word in words:
            check_result = self.PASSED
            if word[:5] == '<red>':
                check_result = self.WRONG_SPELLING
                word = word.replace('<red>', '')
            elif word[:7] == '<green>':
                check_result = self.WRONG_SPACING
                word = word.replace('<green>', '')
            elif word[:8] == '<purple>':
                check_result = self.AMBIGUOUS
                word = word.replace('<purple>', '')
            elif word[:6] == '<blue>':
                check_result = self.STATISTICAL_CORRECTION
                word = word.replace('<blue>', '')
            result['words'][word] = check_result

        self.result = Checked(**result).as_dict()

    def getDictionary(self):
        self.check()
        return self.result

    def getJson(self):
        self.check()
        return json.dumps(self.result)

    def getChecked(self):
        self.check()
        return self.result["checked"]

    def printDictionary(self):
        print(self.getDictionary())

    def printJson(self):
        print(self.getJson())

    def printChecked(self):
        print(self.getChecked())

    def printCheckedJson(self):
        dic = { "result": self.getChecked() }
        print(json.dumps(dic))
