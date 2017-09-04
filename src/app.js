import Twitter from 'twitter';
import tokens from './tokens';
import notifier from 'node-notifier';

const twitter = new Twitter(tokens);

const keywords = ['絵チャ', 'えちゃ', 'お絵かきチャットなう', '#MagicalDraw'];
const keyword_urls = ['draw.kuku.lu', 'www.takamin.com'];

const stream = twitter.stream('user', {with: true}, (stream)=>{
  stream.on('data', (event) => {
    if (event.text != null) {
      for (const keyword of keywords) {
        // キーワードを含むかどうか
        if (~event.text.indexOf(keyword)) {
          notifier.notify({
            title: `${keyword} - tweet-notifier`,
            message: event.text,
          });
          console.log('notified.');
          return;
        }
      }
    }
    for (const { expanded_url } of event.entities.urls) {
      for (const url of keyword_urls) {
        // URLを含むかどうか
        if (~expanded_url.indexOf(url)) {
          notifier.notify({
            title: `${url} - tweet-notifier`,
            message: event.text,
          });
          console.log('notified.');
          return;
        }
      }
    }
  });
  stream.on('error', (error) => {
    throw error;
  });
});
