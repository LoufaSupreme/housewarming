# HOUSEWARMING
A survey app to gather info about friends' availability and preferences.

Live at: https://housewarming-loufasupreme.pythonanywhere.com/ 

### Weird Stuff I Learned
- "overflow-x: hidden" does not work on the body or html element on mobile browsers... has to be on a div inside of them.
- the `@csrf-exempt` decorator needs to be above any API view function for mobile to work.  Mobile browsers do not use the CSRF token properly. If you don't make it exempt you will get a cryptic "string did not match expected pattern" error on fetch requests that makes literally no sense at all. 
- changing the "SECRET_KEY" in Django's settings to a random string of letters does not seem to work, and will trigger an error when trying to deploy to Heroku.  The error will be about "collectstatic" failing, however it has nothing to do with that and is because there's an issue with the Secret Key.
- viewing images is really annoying. There are `{% get_media_prefix %}` methods that can help.  The best thing to do is upload all images into an ImageField or FileField in a Django Model, and then reference them with `{{ model.img.url }}`.  This seems to be the most robust way across different ways of serving images (AWS S3, local development, etc).
- the youtube tutorials by Dennis Ivy and Corey Schafer are excellent for deploying to Heroku and using S3 buckets
- leave DEBUG=True on as long as possible to help debug
- you will need to run `heroku run python3 manage.py collectstatic` to get the static files served properly.  This command tells heroku to run collectstatic directly on its machine.  You may also need to run `python3 manage.py collectstatic` yourself on your local machine prior.
- you will also need to run `heroku run python3 manage.py migrate` in order to get the postgresql db configured with your models.  It seems that a postgres db is automatically made for you when you create a heroku app.
- when using `getUserMedia()` with mobile devices, the following lines of code ALL need to be present for it to work on mobile (not necessary for desktop):
```javascript
video.setAttribute('autoplay', "")
video.setAttribute('muted', "")
video.setAttribute('playsinline', "")
video.play() 
```
- you need to `pip3 install django-heroku` except it will download version 0.0.0 for some dumb reason.  So, either manually install the newest version, or go into your requirements.txt and manually change the version number so Heroku downloads the right version.  Without it, you'll get errors from Heroku when trying to deploy
- there are other packages like django-storage that also need to get installed.
- for some reason, you do not need to change the `DATABASES=` in Settings to postgres or anything else when you deploy.  You can just leave it as is with the default sqlite3.
- note the AWS S3 configurations at the end of Settings.  These are necessary for S3 buckets.  You will need to set up some of these variables as environment variables, and manually configure them in Heroku with `heroku config:set <VARIABLE>='<VALUE>'`.  See the Corey Schafer youtube tutorials for details.
- you can send user uploaded images via JS fetch as a base64 dataURL and then save them to Django model instance, but first need to convert it to a ContentFile.  See views.py for details.
- to deploy to Render you need to specify the PYTHON_VERSION in environment variables.  You also need to make a separate static site (same repository) to serve the static files.

