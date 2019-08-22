import { QuickPickItem } from 'vscode';

export class ExtensionModel {

  public static readonly languages = [
    { language: 'English' },
    { language: 'Spanish' },
    { language: 'Russian' },
    { language: 'Portuguese' },
    { language: 'Japanese' },
  ];

  public static readonly topPickQuickInputItems: QuickPickItem[] = [{
    label: 'Why does HTML think "chucknorris" is a color?',
    detail: '712^ (Asked 7 years, 8 months ago)'
  }, {
    label: 'What\'s your favorite "programmer" cartoon?',
    detail: '835^ (Asked 10 years, 11 months ago)'
  }, {
    label: 'What is the best comment in source code you have ever encountered?',
    detail: '360^ (Asked 10 years, 10 months ago)'
  }, {
    label: 'How to pair socks from a pile efficiently?',
    detail: '3810^ (Asked 6 years, 6 months ago)'
  }, {
    label: 'What\'s the difference between JavaScript and Java?',
    detail: '77^ (Asked 10 years, 9 months ago)'
  }, {
    label: 'Strangest language feature',
    detail: '975^ (Asked 9 years, 7 months ago)'
  }, {
    label: 'Why does ++[[]][+[]]+[+[]] return the string "10"?',
    detail: '1582^ (Asked 7 years, 11 months ago)'
  }, {
    label: 'What\'s the least useful comment you\'ve ever seen?',
    detail: '20^ (10 years, 10 months ago)'
  }, {
    label: 'What was the strangest coding standard rule that you were forced to follow?',
    detail: '173^ (Asked 10 years, 9 months ago)'
  }, {
    label: 'What is the coolest thing you can do in <10 lines of simple code? Help me inspire beginners!',
    detail: '406^ (Asked 10 years, 3 months ago)'
  }, {
    label: 'What\'s your most controversial programming opinion?',
    detail: '363^ (Asked 10 years, 7 months ago)'
  }];

  public static readonly topPickIds = [{
    label: 'Why does HTML think "chucknorris" is a color?',
    id: '8318911',
    gif: 'https://giphy.com/embed/3yhmYJ0A5lQv6'
  }, {
    label: 'What\'s your favorite "programmer" cartoon?',
    id: '84556',
    gif: 'https://thecodinglove.com/wp-content/uploads/2019/07/img_2661-1.jpg'
  }, {
    label: 'What is the best comment in source code you have ever encountered?',
    id: '184618',
    gif: 'https://giphy.com/embed/ZHlGzvZb130nm'
  }, {
    label: 'How to pair socks from a pile efficiently?',
    id: '14415881',
    gif: 'https://giphy.com/embed/y65VoOlimZaus'
  }, {
    label: 'What\'s the difference between JavaScript and Java?',
    id: '245062',
    gif: 'https://giphy.com/embed/l36kU80xPf0ojG0Erg'
  }, {
    label: 'Strangest language feature',
    id: '1995113',
    gif: 'https://giphy.com/embed/5WhcSpUjK02f30sDQr'
  }, {
    label: 'Why does ++[[]][+[]]+[+[]] return the string "10"?',
    id: '7202157',
    gif: 'https://giphy.com/embed/8fjedJmOkkcTu'
  }, {
    label: 'What\'s the least useful comment you\'ve ever seen?',
    id: '143429',
    gif: 'https://giphy.com/embed/lz67zZWfWPsWnuGH0s'
  }, {
    label: 'What was the strangest coding standard rule that you were forced to follow?',
    id: '218123',
    gif: 'https://giphy.com/embed/c4u2gld3Or69i'
  }, {
    label: 'What is the coolest thing you can do in <10 lines of simple code? Help me inspire beginners!',
    id: '811074',
    gif: 'https://giphy.com/embed/Z543HuFdQAmkg'
  }, {
    label: 'What\'s your most controversial programming opinion?',
    id: '406760',
    gif: 'https://giphy.com/embed/UTY42CoHu6wixtxTDh'
  }];

}