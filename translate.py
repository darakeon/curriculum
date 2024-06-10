from googletrans import Translator, LANGUAGES
from json import loads, dumps
from os.path import isfile
from sys import argv


class Program:

	ALLOWED_LANGUAGES = ['PT', 'EN', 'NL', 'ES', 'ZZ']

	def __init__(self, args):
		if len(args) < 2:
			print('Pass as first parameter whose profile you want to translate')
			exit(1)

		if len(args) < 3:
			print('Pass as second parameter which language you want to translate to')
			exit(1)

		self.json = f'{args[1]}.json'
		self.language = args[2]

		if not isfile(self.json):
			print(f'There is no file {self.json}')
			exit(1)

		if self.language not in self.ALLOWED_LANGUAGES:
			print(f'Language {self.language} not allowed (allowed ones: {self.ALLOWED_LANGUAGES})')
			exit(1)


	def translate(self):
		print(f'Translating {self.json} to {self.language}...')

		with open(self.json) as file:
			content = loads(file.read())

		self.translate_dict(content)

		json = dumps(content, ensure_ascii=False, indent='\t') + '\n'

		with open(self.json, 'w') as file:
			file.write(json)


	def translate_dict(self, dictionary: dict):
		keys = set(dictionary.keys())
		intersect_langs = set(self.ALLOWED_LANGUAGES).intersection(keys)
		are_translations = intersect_langs == keys

		if are_translations:
			self.translate_text(dictionary)
		else:
			for key in dictionary:
				print(key)
				self.translate_obj(dictionary[key])


	def translate_obj(self, obj):

		if isinstance(obj, dict):
			self.translate_dict(obj, )
		elif isinstance(obj, list):
			for item in obj:
				self.translate_obj(item)


	def translate_text(self, dictionary):
		if self.language == 'ZZ':
			dictionary[self.language] = ''
			return

		if 'EN' in dictionary:
			original_language = 'EN'
		else:
			original_language = list(dictionary)[0]

		original_text = dictionary[original_language]

		translator = Translator()
		translated = translator.translate(original_text, src=original_language, dest=self.language)
		
		dictionary[self.language] = translated.text

		if 'ZZ' in dictionary:
			zz = dictionary['ZZ'] 
			del dictionary['ZZ']
			dictionary['ZZ'] = zz


## Execution

program = Program(argv)

program.translate()
