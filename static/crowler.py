from boto3 import client
from json import loads, dumps
from os import path, listdir, environ, mkdir
from re import search, sub
from requests import get, packages

packages.urllib3.disable_warnings() 


# pip install boto3
# LOCAL_SITE 127.0.0.1:3000
# ACCESS_KEY
# SECRET_KEY
# BUCKET


class Crowler:

	ENCODING = 'utf-8'


	def __init__(self, local_url, public_url, access_key, secret_key, bucket):
		self.local_url = f'http://{local_url}'
		self.public_url = public_url

		self.s3 = client(
			's3', 
			aws_access_key_id=access_key,
			aws_secret_access_key=secret_key,
		)

		self.bucket = bucket


	def upload_dynamic(self):

		url = self.local_url
		file_path = f'home.html'
		self._upload_html(url, file_path)

		curriculums = self._get_curriculums()

		for curriculum in curriculums:

			if not path.exists(curriculum):
				mkdir(curriculum)

			langs = curriculums[curriculum]

			for lang in langs:

				url = f'{self.local_url}/{curriculum}/{lang}'
				file_path = path.join(curriculum, f'{lang}')

				self._upload_html(url, file_path)

	def _get_curriculums(self):
		curriculums = {}

		for item in listdir('..'):
			item_path = path.join('..', item)
			curr_regex = search(r'^([a-z\-]+).json$', item)

			if path.isfile(item_path) and curr_regex:
				name = curr_regex.groups()[0]

				if name == 'package-lock':
					continue

				with open(item_path) as file:
					file_data = loads(file.read())

				curriculums[name] = self._get_languages(file_data)

		return curriculums
	
	def _get_languages(self, data):
		if type(data) is list:
			for item in data:
				langs = self._get_languages(item)
				if langs: return langs

		elif type(data) is dict:
			is_lang = True
			for key in data:
				if not search(r'^[A-Z]{2}$', key):
					is_lang = False
					break

			if is_lang:
				return data.keys()
			
			for key in data:
				langs = self._get_languages(data[key])
				if langs: return langs
		
		else:
			return None

	def _upload_html(self, url, file_path):
		print(url)
		content = get(url, verify=False).content.decode(self.ENCODING)

		content = self._clear_html(content)

		with open(file_path, 'w') as file:
			file.write(content)

		extra_args = {
			'ContentType': 'text/html',
			'ContentEncoding': 'utf-8',
		}

		self._upload(file_path, file_path, extra_args)

	def _clear_html(self, content: str):
		content = content.replace(self.local_url, self.public_url)

		return content


	def upload_static(self):
		site_path = path.join('..', 'content')
		files = self._get_files(site_path, '', r'.+\.html')

		for file in files:
			extra_args = {}

			if file['path'].endswith('.css'):
				extra_args['ContentType'] = 'text/css'

			if file['path'].endswith('.js'):
				extra_args['ContentType'] = 'text/javascript'

			self._upload(file['path'], file['bucket'], extra_args)

	def _get_files(self, main_folder, relative_folder, ignore):
		main_path = path.join(main_folder, relative_folder)
		files = []

		for item in listdir(main_path):
			item_path = path.join(main_path, item)
			item_bucket = path.join(relative_folder, item)

			if path.isfile(item_path) and not search(ignore, item):
				files.append({
					'path': item_path,
					'bucket': item_bucket,
				})

			elif path.isdir(item_path) and item not in ignore:
				files = files + self._get_files(main_folder, item_bucket, ignore)

		return files


	def _upload(self, path, object, extra_args):
		print('Upload', object)
		self.s3.upload_file(
			path,
			self.bucket,
			object,
			ExtraArgs=extra_args
		)



crowler = Crowler(
	environ['LOCAL_SITE'],
	'meak.com.br',
	environ['ACCESS_KEY'],
	environ['SECRET_KEY'],
	environ['BUCKET'],
)

crowler.upload_dynamic()
crowler.upload_static()
