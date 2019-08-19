import { QuickPickItem, languages } from 'vscode';

export interface ILanguage {
  language: string;
  code: string;
  text: any;
}

export interface ISortTypes {
  label: string;
  apiReference: string;
  isSelected: boolean;
  text: any;
}

export class ExtensionModel {

  public static readonly languages: ILanguage[] = [
    {
      language: 'English', code: '', text: {
        search: 'search',
        search_results: 'search results',
        results_for: 'results for',
        results: 'results',
        advanced_search_tips: 'advanced search tips',
        asked: 'asked',
        by: 'by',
        at: 'at',
        answers: 'answers',
        answer: 'answer',
        votes: 'votes',
        vote: 'vote',
        questions: 'questions',
        relevance: 'relevance',
        newest: 'newest',
        active: 'active',
        next: 'next',
        viewed: 'viewed',
        times: 'times',
        locked: 'locked',
        closed: 'closed',
        on_hold: 'on hold',
        learn_more: 'learn more',
        questions_tagged: 'questions tagged',
        back_to_search_results: 'back to search results',
        about: 'about',
        tag_info: 'tag info',
        view_online: 'view online',
        no_answers: 'no answers',
        show: 'show',
        more_comments: 'more comments',
        hide_comments: 'hide comments',
        close_search_tips: 'close search tips',
        no_results_abbr_01: 'We couldn\'t find anything for',
        no_results_abbr_02: 'Try different or less specific keywords.'
      }
    },
    {
      language: 'Spanish', code: 'es.', text: {
        search: 'buscar',
        search_results: 'resultados de Búsqueda',
        results_for: 'resultados para',
        results: 'resultados',
        advanced_search_tips: 'consejos de búsqueda avanzada',
        asked: 'formulada el',
        by: 'por',
        at: '',
        answers: 'respuestas',
        answer: 'responder',
        votes: 'voto',
        vote: 'voto',
        questions: 'preguntas',
        relevance: 'relevancia',
        newest: 'más reciente',
        active: 'activo',
        next: 'siguiente',
        viewed: 'vista',
        times: 'veces',
        locked: 'locked',
        closed: 'closed',
        on_hold: 'en espera',
        learn_more: 'learn more',
        questions_tagged: 'preguntas con la etiqueta',
        back_to_search_results: 'Regresar a los resultados de búsqueda',
        about: 'acerca de',
        tag_info: 'información de etiqueta',
        view_online: 'ver online',
        no_answers: 'sin respuestas',
        show: 'show',
        more_comments: 'Más comentarios',
        hide_comments: 'ocultar comentarios',
        close_search_tips: 'cerrar consejos de búsqueda',
        no_results_abbr_01: 'No pudimos encontrar nada para',
        no_results_abbr_02: 'Pruebe palabras clave diferentes o menos específicas.'
      }
    },
    {
      language: 'Russian', code: 'ru.', text: {
        search: 'поиск',
        search_results: 'pезультаты поиска',
        results_for: 'результаты для',
        results: 'результатов',
        advanced_search_tips: 'cоветы по использованию расширенного поиска',
        asked: 'задан',
        by: 'участником',
        at: '',
        answers: 'ответов',
        answer: 'ответ',
        votes: 'голосов',
        vote: 'голос',
        questions: 'вопросы',
        relevance: 'pелевантные',
        newest: 'hовые',
        active: 'tекущие',
        next: 'далее',
        viewed: 'Просмотрен',
        times: 'раза',
        locked: 'запертый',
        closed: 'закрыто',
        learn_more: 'узнать больше',
        questions_tagged: 'Вопросы с меткой',
        back_to_search_results: 'назад t результаты поиска',
        about: 'около',
        tag_info: 'информация тега',
        view_online: 'смотреть онлайн',
        no_answers: 'нет ответов',
        show: 'шоу',
        more_comments: 'больше комментариев',
        hide_comments: 'скрыть комментарии',
        close_search_tips: 'cоветы по поиску',
        no_results_abbr_01: 'Мы не смогли найти ничего для',
        no_results_abbr_02: 'Попробуйте использовать другие или менее конкретные ключевые слова.'
      }
    },
    {
      language: 'Portuguese', code: 'pt.', text: {
        search: 'pesquisar',
        search_results: 'search results',
        results_for: 'resultados para',
        results: 'resultados',
        advanced_search_tips: 'pesquisa Avançada',
        asked: 'perguntada',
        by: 'por',
        at: 'às',
        answers: 'respostas',
        answer: 'resposta',
        votes: 'votos',
        vote: 'votos',
        questions: 'perguntas',
        relevance: 'relevância',
        newest: 'recente',
        active: 'ativa',
        next: 'próxima',
        viewed: 'vista',
        times: 'vezes',
        locked: 'locked',
        closed: 'closed',
        on_hold: 'em espera',
        learn_more: 'saiba mais',
        questions_tagged: 'questions tagged',
        back_to_search_results: 'de volta aos resultados da pesquisa',
        about: 'sobre',
        tag_info: 'informações de tag',
        view_online: 'ver online',
        no_answers: 'sem respostas',
        show: 'exposição',
        more_comments: 'mais comentários',
        hide_comments: 'esconder comentários',
        close_search_tips: 'feche as dicas de pesquisa',
        no_results_abbr_01: 'Não encontramos nada para',
        no_results_abbr_02: 'Experimente palavras-chave diferentes ou menos específicas.'
      }
    },
    {
      language: 'Japanese', code: 'ja.', text: {
        search: '検索',
        search_results: '検索結果',
        results_for: 'の結果',
        results: '結果',
        advanced_search_tips: '高度な検索のヒント',
        asked: '質問日時',
        by: '質問者',
        at: '',
        answers: '回答',
        answer: '回答',
        votes: '投票',
        vote: '票',
        questions: '質問',
        relevance: '関連',
        newest: '新着',
        active: 'アクティブ',
        next: '次へ',
        viewed: '閲覧数',
        times: '件',
        locked: 'ロックされた',
        closed: '閉まっている',
        on_hold: '保留',
        learn_more: 'もっと詳しく',
        questions_tagged: 'タグが付いた質問',
        back_to_search_results: '検索結果に戻る',
        about: '約',
        tag_info: 'タグ情報',
        view_online: 'オンラインで見る',
        no_answers: '答えはありません',
        show: '見せる',
        more_comments: '他のコメント',
        hide_comments: 'コメントを隠す',
        close_search_tips: '検索のヒントを閉じる',
        no_results_abbr_01: '何も見つかりませんでした',
        no_results_abbr_02: '別のキーワードまたは具体性の低いキーワードを試してください。'
      }
    },
  ];

  public static readonly sortTypes: ISortTypes[] = [
    {
      label: 'Relevance', apiReference: 'relevance', isSelected: false, text: {
        english: 'relevance',
        spanish: 'relevancia',
        russian: 'pелевантные',
        portuguese: 'relevância',
        japanese: '関連'
      }
    },
    {
      label: 'Newest', apiReference: 'creation', isSelected: false, text: {
        english: 'newest',
        spanish: 'más reciente',
        russian: 'hовые',
        portuguese: 'recente',
        japanese: '新着'
      }
    },
    {
      label: 'Active', apiReference: 'activity', isSelected: false, text: {
        english: 'active',
        spanish: 'activo',
        russian: 'tекущие',
        portuguese: 'ativa',
        japanese: 'アクティブ'
      }
    },
    {
      label: 'Votes', apiReference: 'votes', isSelected: false, text: {
        english: 'votes',
        spanish: 'votos',
        russian: 'голосов',
        portuguese: 'votos',
        japanese: '投票'
      }
    }
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
    label: 'What is the coolest thing you can do in <10 lines of simple code? Help me inspire beginners!',
    detail: '406^ (Asked 10 years, 3 months ago)'
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
    gif: 'https://giphy.com/embed/fGuqeA6PiXINa'
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
    gif: 'https://giphy.com/embed/oMpJql97PCGHe'
  }];

}