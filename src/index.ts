

import * as functions from 'firebase-functions';
// import { createContext } from 'vm';
// import { request } from 'https';



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.webhook = functions.https.onRequest((request, response) => {
const {
  dialogflow,
  BasicCard,
  Button,
  List,
  Suggestions,
  UpdatePermission,
  SimpleResponse,
  LinkOutSuggestion,
  Image,
  Carousel,
  Table,
  BrowseCarousel,
  BrowseCarouselItem



} = require('actions-on-google');

const admin = require('firebase-admin');





admin.initializeApp();
const db = admin.firestore();
const app = dialogflow({ debug: true });

app.intent('Partial', (conv) => {
  triggerPartialIntent(conv);
});
app.intent('Ask Question', (conv) => {
    triggerAskQuestionIntent(conv);
  });
  function triggerAskQuestionIntent(conv) {
    conv.ask(new SimpleResponse({
        speech: 'Okay , Please ask your question .',
        text: ' Okay , Please ask your question .',

    }));
    conv.ask(new Suggestions(['Exams Date ', 'Majors','Courses ','End Conversation ', 'Entrance Exam']));

  
  
  }
  

app.intent('Exams Schedule', (conv) => {
    triggerExamsScheduleIntent(conv);
  });

  function triggerExamsScheduleIntent(conv) {
    // conv.context.set(context.Exam_Date, 5);
    conv.ask(new SimpleResponse({
        speech: 'Please choose from the Schedule from the list below :',
        text: 'Please choose from the Schedule from the list below :',
  
    }));
    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
        conv.ask('Sorry, try this on a screen device or select the ' +
            'phone surface in the simulator.');
        return;
    }
    conv.ask(new List({
        title: 'Exams Schedule',
        items: {
  
  
  
  
            // Add the Third item to the list
            'Partial Schedule': {
                synonyms: [
                    'Partial Schedule',
  
                ],
                title: 'Partial Schedule',
                description: 'Allow the students to view the Partial schedule ',
  
                image: new Image({
                    url: 'http://bishopgrimes.org/wp/wp-content/uploads/2016/11/Midterm-Exams.jpg',
                    alt: 'Partial Schedule',
                }),
            },
            // Add the Third item to the list
            'Final Schedule': {
                synonyms: [
                    'Final Schedule',
  
                ],
                title: 'Final Schedule',
                description: 'Allow the students to view the Final schedule   ',
  
                image: new Image({
                    url: 'http://mchs-ptsa.com/wp-content/uploads/2016/04/final-exam.jpg',
                    alt: 'Final Schedule',
                }),
            },
            'Second Round Schedule': {
                synonyms: [
                    'Second Round Schedule',
  
                ],
                title: 'Second Round Schedule',
                description: 'Allow the students to view the Second Round schedule',
  
                image: new Image({
                    url: 'https://d1yn1kh78jj1rr.cloudfront.net/image/thumbnail/Sjblp6Hpej18ngw4z/graphicstock-test-word-representing-questions-text-and-exam_HNPQRL1ACl_thumb.jpg',
                    alt: 'Second Round Schedule',
                }),
            },
  
        },
    }));
    conv.ask(new Suggestions(['Second Round Schedule ', 'Final Schedule ','Partial Schedule']));
  }
app.intent('Dont Have Questions', (conv) => {
    triggerDontHaveQuestionsIntent(conv);
  });
  function triggerDontHaveQuestionsIntent(conv) {
    conv.close("Thank You for using Lebanese University Personal Assistance ! \n Have a nice day Students :)")
  
  
  }
app.intent('Entrance Exam Sample', (conv) => {
    triggerSampleExamIntent(conv);
  });

  function triggerSampleExamIntent (conv)  {
    conv.ask(new SimpleResponse({
        speech: 'Previous Exams :',
        text: 'Previous Exams : ',
  
    }));
    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
        conv.ask('Sorry, try this on a screen device or select the ' +
            'phone surface in the simulator.');
        return;
    }
    conv.ask(new BasicCard({
        text: `Entrance Exam Samples`, // Note the two spaces before '\n' required for
        // a line break to be rendered in the card.
  
  
        buttons: new Button({
            title: 'Please find all the previous exams of all the years in the link below.',
            url: 'https://www.ul.edu.lb/media/announcements/previousExams.aspx?facultyId=11',
        }),
        image: new Image({
            url: 'http://im.rediff.com/getahead/2005/mar/04exams.jpg',
            alt: 'Previous Exams',
        }),
    }));
  
    conv.ask(new Suggestions(['Required Documents ', 'Exam Schedule  ','Majors','Courses','Exams Date']));
  
  
  }
  
  


app.intent('Courses', (conv) => {
    triggerCoursesIntent(conv);
  });

  function triggerCoursesIntent(conv) {
    conv.ask(new SimpleResponse({
        speech: 'What is the name of the course ?',
        text: 'What is the name of the course ?',
  
    }));
    
  
   
    conv.ask(new Suggestions(['Mobile Development ']));
  
  
  }


  app.intent('MobileDevelopment', (conv) => {
    triggerMobileDevelopmentIntent(conv);
  });
  function triggerMobileDevelopmentIntent(conv) {
    conv.ask(new SimpleResponse({
        speech: 'Chapters that are required for Mobile Development :',
        text: 'Chapters that are required for Mobile Development :',
  
    }));
    conv.ask(new BrowseCarousel({
        items: [
          new BrowseCarouselItem({
            title: 'ListView & ArrayAdapter',
            url: 'http://moodle.bilalsaid.com/course/view.php?id=18',
            description: 'ListView & ArrayAdapter, JSON parsing and serialization & the Gson library.',
            image: new Image({
              url: 'http://www.img.lirent.net/2014/01/Android-Application-Development-List-View-Tutorial.jpg',
              alt: 'ListView',
            }),
            footer: '1',
          }),
          new BrowseCarouselItem({
            title: 'SQLite Database',
            url: 'http://moodle.bilalsaid.com/course/view.php?id=18',
            description: 'To open, view and manage SQLite .db files, for instance those imported from Android devices.',
            image: new Image({
              url: 'https://i.ytimg.com/vi/3AVPhip842M/maxresdefault.jpg',
              alt: 'SQLite',
            }),
            footer: '2',
          }),
        ],
      }));
   
    conv.ask(new Suggestions(['Majors ', 'Exam Date ','Exam Schedule','Entrance Exam','Ask Question','End Conversation']));
  
  
  }
function triggerPartialIntent(conv) {
  conv.ask(new SimpleResponse({
      speech: 'Partial will start on 10 may ',
      text: 'Partial will start on 10 may ',

  }));
 

conv.ask(new BasicCard({
    text: `Partial Schedule `, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    
    
    buttons: new Button({
      title: 'please follow the link to view the Partial schedule .',
      url: 'https://www.dropbox.com/home/Exams%20Schedule?preview=%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC+%D8%A7%D9%84%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA+%D8%A7%D9%84%D9%86%D9%87%D8%A7%D8%A6%D9%8A%D8%A9++%D8%A7%D9%84%D9%81%D8%B5%D9%84+%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A+%D9%84%D9%84%D8%B9%D8%A7%D9%85+2017-2018.pdf',
    }),
    image: new Image({
      url: 'http://bishopgrimes.org/wp/wp-content/uploads/2016/11/Midterm-Exams.jpg',
      alt: 'Partial Schedule',
    }),
    display: 'CROPPED',
  }));



 

  
  conv.ask(new Suggestions(['Ask Question ', 'Majors','Courses ','End Conversation ', 'Entrance Exam']));


}
app.intent('Final', (conv) => {
    triggerFinalIntent(conv);
  });
function triggerFinalIntent (conv){
  conv.ask(new SimpleResponse({
      speech: 'final will starts on 20 June',
      text: 'final will starts on 20 June ',

  }));
  conv.ask(new BasicCard({
    text: `Final Schedule `, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    
    
    buttons: new Button({
      title: 'please follow the link to view the Final schedule .',
      url: 'https://www.dropbox.com/home/Exams%20Schedule?preview=%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC+%D8%A7%D9%84%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA+%D8%A7%D9%84%D9%86%D9%87%D8%A7%D8%A6%D9%8A%D8%A9++%D8%A7%D9%84%D9%81%D8%B5%D9%84+%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A+%D9%84%D9%84%D8%B9%D8%A7%D9%85+2017-2018.pdf',
    }),
    image: new Image({
      url: 'https://www.featurepics.com/StockImage/20070902/grunge-office-stamp-final-stock-illustration-437755.jpg',
      alt: 'Final Schedule',
    }),
    display: 'CROPPED',
  }));
  conv.ask(new Suggestions(['Ask Question ', 'Majors','Courses ','End Conversation ', 'Entrance Exam']));


}

app.intent('second round', (conv) => {
    triggersecondroundIntent(conv);
  });
function triggersecondroundIntent (conv) {
  conv.ask(new SimpleResponse({
      speech: 'Second round will starts on 20 July',
      text: 'Second round will starts on 20 July ',

  }));
  conv.ask(new BasicCard({
    text: `Second round Schedule `, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    
    
    buttons: new Button({
      title: 'please follow the link to view the Second round schedule .',
      url: 'https://www.dropbox.com/home/Exams%20Schedule?preview=%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC+%D8%A7%D9%84%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86%D8%A7%D8%AA+%D8%A7%D9%84%D9%86%D9%87%D8%A7%D8%A6%D9%8A%D8%A9++%D8%A7%D9%84%D9%81%D8%B5%D9%84+%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A+%D9%84%D9%84%D8%B9%D8%A7%D9%85+2017-2018.pdf',
    }),
    image: new Image({
      url: 'https://oejk4q.corednacdn.com/web_images/blogs/214/3547/8%20tips%20for%20second%20round%20interviews_940x485.jpg',
      alt: 'Second round Schedule',
    }),
    display: 'CROPPED',
  }));
  conv.ask(new Suggestions(['Ask Question ', 'Majors','Courses ','End Conversation ', 'Entrance Exam']));


}
app.intent('EntranceExam', (conv) => {
  triggerEntranceExamIntent(conv);
});
app.intent('About Exam', (conv) => {
    triggerAboutExamIntent(conv);
  });
  function triggerAboutExamIntent(conv) {
    // conv.context.set(context.Exam_Date, 5);
    conv.ask(new SimpleResponse({
        speech: 'Please choose from the list below:',
        text: 'Please choose from the list below:',
  
    }));
    if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
        conv.ask('Sorry, try this on a screen device or select the ' +
            'phone surface in the simulator.');
        return;
    }
    conv.ask(new List({
        title: 'Entrance Exam',
        items: {
  
  
  
  
            // Add the Third item to the list
            'About Entrance Exam': {
                synonyms: [
                    'About Entrance Exam',
  
                ],
                title: 'About Entrance Exam',
                description: 'Display more Details about Entrance Exam Date',
  
                image: new Image({
                    url: 'https://gestion1.ul.edu.lb/images/bus5.JPG',
                    alt: 'About Entrance Exam',
                }),
            },
            // Add the Third item to the list
            'Required Documents': {
                synonyms: [
                    'Required Documents',
  
                ],
                title: 'Required Documents',
                description: 'Display the required document in order to register in the exam ',
  
                image: new Image({
                    url: 'https://www.openkm.com/resources/images/icon/document-management-big.png',
                    alt: 'Required Documents',
                }),
            },
            'Entrance Exam Sample': {
                synonyms: [
                    'Entrance Exam Sample',
  
                ],
                title: 'Entrance Exam Sample',
                description: 'Display some of the exam samples that have been made in the last years',
  
                image: new Image({
                    url: 'http://im.rediff.com/getahead/2005/mar/04exams.jpg',
                    alt: 'Second Round',
                }),
            },
  
        },
    }));
    conv.ask(new Suggestions(['About Entrance Exam ', 'Required Documents ','Entrance Exam Sample']));
  }

app.intent('About Entrance Exam', (conv) => {
    triggerAboutEntranceExamIntent(conv);
  });
function triggerAboutEntranceExamIntent (conv)  {
  conv.ask(new SimpleResponse({
      speech: 'Please follow the link to know more about entrance exam',
      text: 'Please follow the link to know more about entrance exam ',

  }));
  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
      conv.ask('Sorry, try this on a screen device or select the ' +
          'phone surface in the simulator.');
      return;
  }
  conv.ask(new BasicCard({
      text: `Entrance exam for the year 2018-2019`, // Note the two spaces before '\n' required for
      // a line break to be rendered in the card.


      buttons: new Button({
          title: 'Read More !',
          url: 'https://ul.edu.lb/files/announces_20180620.jpg',
      }),
      image: new Image({
          url: 'https://gestion1.ul.edu.lb/images/bus5.JPG',
          alt: 'Entrance Exam',
      }),
  }));

  conv.ask(new Suggestions(['End Conversation ', 'Required Documents','Ask Question','Exam Schedule','Courses','Majors']));


}

app.intent('Required Documents', (conv) => {
    triggerRequiredDocumentsIntent(conv);
  });
function triggerRequiredDocumentsIntent (conv) {
  conv.ask(new SimpleResponse({
      speech: 'Documents required for the entrance exam 2018-2019:',
      text: 'Documents required for the entrance exam 2018-2019: ',

  }));
  conv.ask(new SimpleResponse({
      speech: '1- صورة عن اخراج القيد  \n     2- صورة عن بطاقة الترشيح  \n     3- صورتان شمسيتان مصدقتان \n    4- طابع مالي \n  5- رسم الاشتراك 35000',
      text: '1- صورة عن اخراج القيد  \n     2- صورة عن بطاقة الترشيح  \n     3- صورتان شمسيتان مصدقتان \n    4- طابع مالي \n  5- رسم الاشتراك 35000',

  }));

  conv.ask(new Suggestions(['Entrance Exams Samples ', 'End conversation', 'Majors', 'Exams Date', 'Courses','Ask Question']));

}
app.intent('Exams Date', (conv) => {
  triggerExamsDateIntent(conv);
});

app.intent('Default Welcome Intent', (conv) => {
  //  conv.context.set(context.Exam_Date, 5);

  conv.ask(new SimpleResponse({
      speech: 'Hello LU students, Welcome to Lebanese University Personal Assistance ! ',
      text: 'Hello LU students, Welcome to Lebanese University Personal Assistance !',

  }));
  conv.ask(new Carousel({

      items: {
          // Add the first item to the list
          'Exams Date': {
              synonyms: [
                  'Exams Date',

              ],
              title: 'Exams Date',
              description: 'Allow The Students to know when they will start the Partial, Final & Second Round Exams',
              image: new Image({
                  url: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201511/exam-dates-647-x--4041_111015014631.jpg',
                  alt: 'Exams',
              }),
          },
          // Add the second item to the list
          'Entrance exam': {
              synonyms: [
                  'Entrance exam',

              ],
              title: 'Entrance exam',
              description: 'Allow the new students to know the Date of the exam ,  required Documents and Samples of the exam. ',

              image: new Image({
                  url: 'http://www.ulfmetn.edu.lb/sites/default/files/admission_ulf3_2.jpg',
                  alt: 'Entrance Exam',
              }),
          },
          // Add the Third item to the list
          'majors': {
              synonyms: [
                  'majors',
              ],
              title: 'Majors',
              description: 'Allow the students to know the 5 majors of business administration & courses of each major. ',

              image: new Image({
                  url: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/991947/300/200/m1/fpc/wm0/hq0wfolunquhkrxudts7y9yi34loahhim4mhpe4levappljbgjl8eqgutmdrprer-.jpg?1455441744&s=6e397d6436a045f473d489bad4dc4021',
                  alt: 'majors',
              }),
          },
          // Add the Third item to the list
          'Courses': {
              synonyms: [
                  'Courses',

              ],
              title: 'Courses',
              description: 'Allow the students to know the chapters for all the courses required for exams.  ',

              image: new Image({
                  url: 'http://www.nirmalacollegeranchi.com/images/courses.jpg',
                  alt: 'Courses',
              }),
          },
          'Exams Schedule': {
              synonyms: [
                  'Exams Schedule',

              ],
              title: 'Exams Schedule',
              description: 'Allow the students to view the Partial, Final Or Secound Round schedule ',

              image: new Image({
                  url: 'https://previews.123rf.com/images/kchung/kchung1506/kchung150600286/40716909-industrial-robotic-arm-building-schedule-word-on-white-background.jpg',
                  alt: 'Exams Schedule',
              }),
          },

      },
  }));

  conv.ask(new Suggestions(['Exams Date', 'About Entrance Exam','Courses','Exam Schedule','Majors']));


});

// const SELECTED_ITEM_RESPONSES = {
//   'Exams Date': 'you selected Exams Date',
//   'Entrance exam': 'you selected Entrance exam' ,
//   'majors': 'You selected the Google Home!' ,
//   'Courses': 'You selected the Courses',
//   'Exams Schedule': 'You selected Exams Schedule ',
// };

function triggerExamsDateIntent(conv) {
  // conv.context.set(context.Exam_Date, 5);
  conv.ask(new SimpleResponse({
      speech: 'Please choose the exam that you want to know more about:',
      text: 'Please choose the exam that you want to know more about:',

  }));
  if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
      conv.ask('Sorry, try this on a screen device or select the ' +
          'phone surface in the simulator.');
      return;
  }
  conv.ask(new List({
      title: 'Exams Date',
      items: {




          // Add the Third item to the list
          'Partial': {
              synonyms: [
                  'Partial',

              ],
              title: 'Partial',
              description: 'Display the date of the partial exam. ',

              image: new Image({
                  url: 'https://previews.123rf.com/images/icetray/icetray1503/icetray150304812/37421131-partial-vector-word-on-red-concrete-wall.jpg',
                  alt: 'Partial',
              }),
          },
          // Add the Third item to the list
          'Final': {
              synonyms: [
                  'Final',

              ],
              title: 'Final',
              description: 'Display the date of the final exam.   ',

              image: new Image({
                  url: 'https://www.featurepics.com/StockImage/20070902/grunge-office-stamp-final-stock-illustration-437755.jpg',
                  alt: 'Final',
              }),
          },
          'Second Round': {
              synonyms: [
                  'Second Round',

              ],
              title: 'Second Round',
              description: 'Display the date of the Second Round exam.',

              image: new Image({
                  url: 'https://oejk4q.corednacdn.com/web_images/blogs/214/3547/8%20tips%20for%20second%20round%20interviews_940x485.jpg',
                  alt: 'Second Round',
              }),
          },

      },
  }));
  conv.ask(new Suggestions(['Partial ', 'Final ','Second Round']));
}
function triggerEntranceExamIntent(conv) {
  conv.ask(new SimpleResponse({
      speech: 'Entrance exam for the year 2018-2019 will starts on 21 july',
      text: 'Entrance exam for the year 2018-2019 will starts on 21 july ',

  }));
  conv.ask(new SimpleResponse({
      speech: '  Do you need to know more about this exam  ?',
      text: ' Do you need to know more about this exam  ? ',

  }));
  conv.ask(new Suggestions(['About Exam ', 'End Conversation  ']));
}
function triggerMajorsIntent(conv) {
  conv.ask(new SimpleResponse({
      speech: 'In Lebanese University we have 5 majors:',
      text: 'In Lebanese University we have 5 majors: ',

  }));
  conv.ask(new SimpleResponse({
      speech: '1- Management Information System \n 2- Accounting \n 3- Marketing \n 4- Banking and Finance \n 5- Management \n do you want to know more about these majors ?',
      text: ' 1- Management Information System \n 2- Accounting \n 3- Marketing \n 4- Banking and Finance \n 5- Management \n do you want to know more about these majors ?',

  }));
  conv.ask(new Suggestions(['About Majors ', 'End Conversation ']));
  //    conv.ask(new Suggestions(['About Majors ']));
}
function triggerScheduleIntent(conv, type) {
  switch (type) {
      case 'Partial Schedule': {
          conv.ask(new SimpleResponse({
              speech: 'Partial Exam Schedule For The Year 2017-2018',
              text: ' Partial Exam Schedule For The Year 2017-2018',

          }));
          conv.ask(new Table({
              title: 'Partial Schedule',
              // subtitle: 'Table Subtitle',
              // image: new Image({
              //   url: 'https://avatars0.githubusercontent.com/u/23533486',
              //   alt: 'Actions on Google'
              // }),
              columns: [
                  {
                      header: 'Days ',
                      align: 'CENTER',
                  },
                  {
                      header: '9:00-11:00',
                      align: 'CENTER',
                  },
                  {
                      header: '11:30-1:30',
                      align: 'CENTER',
                  }, {
                      header: '2:00-4:00',
                      align: 'CENTER',
                  },
              ],
              rows: [
                  {
                      cells: ['Sat\n 23-3-2018', 'Networking', 'Mobile Development', 'Data Stracture',],
                      dividerAfter: true,
                  },
                  {
                      cells: ['Mon\n 25-3-2018', 'Math 1 ', 'Database', 'System Administration',],
                      dividerAfter: true,
                  },
                  {
                      cells: ['Tue\n 26-3-2018', 'Programming', 'OOP', 'Operating System',],
                      dividerAfter: true,
                  },
              ],
              // buttons: new Button({
              //   title: 'See More !',
              //   url: 'file:///C:/Users/Lenovo/Downloads/برنامج%20الامتحانات%20النهائية%20%20الفصل%20الثاني%20للعام%202017-2018.pdf'
              // }),
          }));
         
          conv.ask(new Suggestions(['Ask Question ', 'Courses ','Majors','End Conversation','Exams Date']));
          break;
      }
      case 'Final Schedule': {
          conv.ask(new SimpleResponse({
              speech: 'Final Exam Schedule For The Year 2017-2018',
              text: ' Final Exam Schedule For The Year 2017-2018',

          }));
          conv.ask(new Table({
              title: 'Final Schedule',
              // subtitle: 'Table Subtitle',
              // image: new Image({
              //   url: 'https://avatars0.githubusercontent.com/u/23533486',
              //   alt: 'Actions on Google'
              // }),
              columns: [
                  {
                      header: 'Days ',
                      align: 'CENTER',
                  },
                  {
                      header: '9:00-11:00',
                      align: 'CENTER',
                  },
                  {
                      header: '11:30-1:30',
                      align: 'CENTER',
                  }, {
                      header: '2:00-4:00',
                      align: 'CENTER',
                  },
              ],
              rows: [
                  {
                      cells: ['Sat\n 23-6-2018', 'Networking', 'Mobile Development', 'Data Stracture',],
                      dividerAfter: true,
                  },
                  {
                      cells: ['Mon\n 25-6-2018', 'Math 1 ', 'Database', 'System Administration',],
                      dividerAfter: true,
                  },
                  {
                      cells: ['Tue\n 26-6-2018', 'Programming', 'OOP', 'Operating System',],
                      dividerAfter: true,
                  },
              ],
              // buttons: new Button({
              //   title: 'See More !',
              //   url: 'file:///C:/Users/Lenovo/Downloads/برنامج%20الامتحانات%20النهائية%20%20الفصل%20الثاني%20للعام%202017-2018.pdf'
              // }),
          }));
          conv.ask(new Suggestions(['Ask Question ', 'Courses ','Majors','End Conversation','Exams Date','Entrance Exam']));
          break;
      }
      case 'Second Schedule': {
          conv.ask(new SimpleResponse({
              speech: 'Second Round Exam Schedule For The Year 2017-2018',
              text: ' Second Round Exam Schedule For The Year 2017-2018',

          }));
          conv.ask(new Table({
              title: 'Second Round Schedule',
              // subtitle: 'Table Subtitle',
              // image: new Image({
              //   url: 'https://avatars0.githubusercontent.com/u/23533486',
              //   alt: 'Actions on Google'
              // }),
              columns: [
                  {
                      header: 'Days ',
                      align: 'CENTER',
                  },
                  {
                      header: '9:00-11:00',
                      align: 'CENTER',
                  },
                  {
                      header: '11:30-1:30',
                      align: 'CENTER',
                  }, {
                      header: '2:00-4:00',
                      align: 'CENTER',
                  },
              ],
              rows: [
                  {
                      cells: ['Sat\n 23-8-2018', 'Multimedia System   ', 'Development Platform', 'Data Stracture',],
                      dividerAfter: true,
                  },
                  {
                      cells: ['Mon\n 25-8-2018', 'Artificial Intelligent', 'Adv. DBMS ', ' Web Services Technologies ',],
                      dividerAfter: true,
                  },
                  {
                      cells: ['Tue\n 26-8-2018', 'Programming', 'OOP', 'Operating System',],
                      dividerAfter: true,
                  },
              ],
              // buttons: new Button({
              //   title: 'See More !',
              //   url: 'file:///C:/Users/Lenovo/Downloads/برنامج%20الامتحانات%20النهائية%20%20الفصل%20الثاني%20للعام%202017-2018.pdf'
              // }),
          }));
       
          conv.ask(new Suggestions(['Ask Question ', 'Courses ','Majors','End Conversation','Exams Date','Entrance Exam']));
      }
  }
}

app.intent('option', (conv, params, option) => {
  console.info('option --------------- ', option);
  switch (option) {
      case 'Exams Date': {
          triggerExamsDateIntent(conv);
          break;
      }
      case 'Entrance exam': {
          triggerEntranceExamIntent(conv);
          break;
      }
      case 'majors': {
          triggerMajorsIntent(conv);
          break;
      }
      case 'Courses': {
        triggerCoursesIntent(conv);  

          break;
      }
      case 'Ask Question': {
        triggerAskQuestionIntent(conv);  

          break;
      }
      case 'MobileDevelopment': {
        triggerMobileDevelopmentIntent(conv);

          break;
      }
      case 'Partial': {
        triggerPartialIntent(conv); 
        break;                                 
    }
    case 'Entrance Exam Sample': {
        triggerSampleExamIntent(conv); //Exams Schedule
        break;                                 
    }
    case 'Dont Have Questions': {
        triggerDontHaveQuestionsIntent(conv);
        break;                                 
    }
    case 'Exams Schedule': {
        triggerExamsScheduleIntent(conv);
        break;                                 
    }
    case 'Final': {
        triggerFinalIntent(conv);
        break;
    }
    case 'second round': {
        triggersecondroundIntent(conv);
        break;
    }
    case 'MIS': {
        triggerMISIntent(conv);    
        break;
    }
    case 'Banking': {
        triggerBankingIntent(conv);    
        break;
    }
    case 'Marketing': {
        triggerMarketingIntent(conv);    
        break;
    }
    case 'Accounting': {
        triggerAccountingIntent(conv);    
        break;
    }
    case 'Management': {
        triggerManagementIntent(conv);    
        break;
    }
    case 'About Entrance Exam': {
        triggerAboutEntranceExamIntent(conv);    
        break;
    }
    case 'About Exam': {
        triggerAboutExamIntent(conv);    
        break;
    }
    case 'Required Documents': {
        triggerRequiredDocumentsIntent(conv);    
        break;
    }
    case 'Partial Schedule': {
        triggerScheduleIntent(conv, 'Partial Schedule');    
        break;
    }
    case 'Final Schedule': {
        triggerScheduleIntent(conv, 'Final Schedule');
        break;
    }
    case 'Second Schedule': {
        triggerScheduleIntent(conv, 'Second Schedule');
        break;
    }

    //   case 'Exams1 Schedule': {
    //       let type = 'PartialSchedule';
    //       triggerScheduleIntent(conv, type);
    //       break;
    //   }
      default: {
        conv.ask('Response not set for this item!  \n   please set response first');
      }
  }
});
app.intent('majors', (conv) => {
  triggerMajorsIntent(conv);
});
app.intent('Partial Schedule', (conv) => {
    triggerScheduleIntent(conv, 'Partial Schedule');
});
app.intent('Final Schedule', (conv) => {
    triggerScheduleIntent(conv, 'Final Schedule');
});
app.intent('Second Schedule', (conv) => {
    triggerScheduleIntent(conv, 'Second Schedule');
});
app.intent('MIS', (conv) => {
    triggerMISIntent(conv);
  });
function triggerMISIntent (conv) {
  conv.ask(new SimpleResponse({
      speech: 'Management information system, or MIS, broadly refers to a computer-based system that provides managers with the tools to organize, evaluate and efficiently manage departments within an organization.',
      text: 'Management information system, or MIS, broadly refers to a computer-based system that provides managers with the tools to organize, evaluate and efficiently manage departments within an organization.',

  }));
  conv.ask(new SimpleResponse({
      speech: 'In Lebanese University this major have 32 course, Please click below to show related courses.  ',
      text: 'In Lebanese University this major have 32 course, Please click below to show related courses.',

  }));

  conv.ask(new BasicCard({

      title: 'MIS courses',
      buttons: new Button({
          title: 'Read More !',
          url: 'https://gestion1.ul.edu.lb/majors/mis.html',
      }),
      image: new Image({
          url: 'https://researchleap.com/wp-content/uploads/2015/11/MIS-2-m9pwwsf4135dukc4kgd45uqwtzpmyuzhlp0kv962oo.jpg',
          alt: 'MIS',
      }),
  }));


  conv.ask(new Suggestions(['End conversation ', 'Banking & finance ', 'Marketing', 'Exams Date', 'Courses','Ask Question']));

}

app.intent('Banking', (conv) => {
    triggerBankingIntent(conv);
  });
function triggerBankingIntent (conv) {
  conv.ask(new SimpleResponse({
      speech: 'A bank is a financial institution licensed to receive deposits and make loans. Banks may also provide financial services, such as wealth management, currency exchange and safe deposit boxes. There are two types of banks: commercial/retail banks and investment banks.',
      text: 'A bank is a financial institution licensed to receive deposits and make loans. Banks may also provide financial services, such as wealth management, currency exchange and safe deposit boxes. There are two types of banks: commercial/retail banks and investment banks.',

  }));
  conv.ask(new SimpleResponse({
      speech: 'In Lebanese University this major have 33 course, Please click below to show related courses.  ',
      text: 'In Lebanese University this major have 33 course, Please click below to show related courses.',

  }));
  conv.ask(new BasicCard({

      title: 'Banking & Finance courses',
      buttons: new Button({
          title: 'Read More !',
          url: 'https://gestion1.ul.edu.lb/majors/FIN.html',
      }),
      image: new Image({
          url: 'https://www.hitechos.com/wp-content/themes/hos-theme/images/banking-and-finance.jpg',
          alt: 'FIN',
      }),
  }));


  conv.ask(new Suggestions(['End conversation ', 'Entrance Exam', 'MIS', 'Ask Question', 'Accounting','Exams Schedule']));

}

app.intent('Marketing', (conv) => {
    triggerMarketingIntent(conv);
  });

function triggerMarketingIntent (conv)  {
  conv.ask(new SimpleResponse({
      speech: 'Marketing is the activity, set of institutions, and processes for creating, communicating, delivering, and exchanging offerings that have value for customers, clients, partners, and society at large. ',
      text: 'Marketing is the activity, set of institutions, and processes for creating, communicating, delivering, and exchanging offerings that have value for customers, clients, partners, and society at large. ',

  }));
  conv.ask(new SimpleResponse({
      speech: 'In Lebanese University this major have 30 course, Please click below to show related courses.  ',
      text: 'In Lebanese University this major have 30 course, Please click below to show related courses.',

  }));

  conv.ask(new BasicCard({

      title: 'Marketing courses',
      buttons: new Button({
          title: 'Read More !',
          url: 'https://gestion1.ul.edu.lb/majors/MARK.html',
      }),
      image: new Image({
          url: 'https://modernmarketingtoday.com/wp-content/uploads/2013/01/marketing.jpg',
          alt: 'MARK',
      }),
  }));


  conv.ask(new Suggestions(['End conversation ', 'Management ', 'Accounting', 'Courses', 'Ask Question','Exams Date']));

}

app.intent('Accounting', (conv) => {
    triggerAccountingIntent(conv);
  });

function  triggerAccountingIntent (conv) {
  conv.ask(new SimpleResponse({
      speech: 'Accounting is the systematic and comprehensive recording of financial transactions pertaining to a business. Accounting also refers to the process of summarizing, analyzing and reporting these transactions to oversight agencies, regulators and tax collection entities.',
      text: 'Accounting is the systematic and comprehensive recording of financial transactions pertaining to a business. Accounting also refers to the process of summarizing, analyzing and reporting these transactions to oversight agencies, regulators and tax collection entities.',

  }));
  conv.ask(new SimpleResponse({
      speech: 'In Lebanese University this major have 35 course, Please click below to show related courses.  ',
      text: 'In Lebanese University this major have 32 course, Please click below to show related courses.',

  }));

  conv.ask(new BasicCard({

      title: 'Accounting courses',
      buttons: new Button({
          title: 'Read More !',
          url: 'https://gestion1.ul.edu.lb/majors/ACC.html',
      }),
      image: new Image({
          url: 'http://joshuawilsoncpa.com/wp-content/uploads/2011/12/AccountingLinkPic2.jpg',
          alt: 'ACC',
      }),
  }));


  conv.ask(new Suggestions(['End conversation ', 'Banking & finance ', 'Marketing', 'Entrance Exam', 'Ask Question']));

}
app.intent('Management', (conv) => {
    triggerManagementIntent(conv);
  });

function  triggerManagementIntent (conv) {
  conv.ask(new SimpleResponse({
      speech: 'Management (or managing) is the administration of an organization, whether it is a business, a not-for-profit organization, or government body. Management includes the activities of setting the strategy of an organization and coordinating the efforts of its employees (or of volunteers) to accomplish its objectives through the application of available resources',
      text: 'Management (or managing) is the administration of an organization, whether it is a business, a not-for-profit organization, or government body. Management includes the activities of setting the strategy of an organization and coordinating the efforts of its employees (or of volunteers) to accomplish its objectives through the application of available resources',

  }));
  conv.ask(new SimpleResponse({
      speech: 'In Lebanese University this major have 29 course, Please click below to show related courses.  ',
      text: 'In Lebanese University this major have 32 course, Please click below to show related courses.',

  }));

  conv.ask(new BasicCard({

      title: 'Management courses',
      buttons: new Button({
          title: 'Read More !',
          url: 'https://gestion1.ul.edu.lb/majors/MANG.html',
      }),
      image: new Image({
          url: 'http://www.mikrozol.com/wp-content/uploads/2015/10/Network-Management-jpg.jpg',
          alt: 'MANG',
      }),
  }));


  conv.ask(new Suggestions(['End conversation ', 'MIS', 'Marketing', 'Exams Date', 'Ask Question','courses','Entrance Exam']));

}

app.intent('doctor name', (conv, {drName}) => {
    let result;
    let data = [];
    return db
    
        .collection('drName')
        .get()
        .then((snapshot) => {
        
          // get the snapshot from firebase first 
          snapshot.forEach((doc) => {
            data[doc.id]=(doc.data());
          });
          
          // now find the appropriate Dr. object from snapshot
          result = data.find(obj => {
          return obj.name === drName
          })
     	// now send back the data to user
			conv.ask(result);
        })
     
    });



exports.webhook = functions.https.onRequest(app);




//     console.log("request.body.result.parameters: ", request.body.result.parameters);
//     let params = request.body.result.parameters;

//     // let token = request.originalRequest.data.user.accessToken

//     switch (request.body.result.action) {
//         case 'majors':
//             response.send({
//                 speech:
//                     `In Lebanese University we have 5 majors:
//     1. Management
//     2. Banking and finance
//     3. Accounting
//     4. Marketing
//     5. Management Information system
//     do you want to know more about these majors ? `
//             });
//             break;
//         case 'partial':
//             response.send({
//                 speech:
//                     ` Partial exam will starts on 21 june` +

//                     ` Do you need to ask another question ( yes, no)?`
//             });
//             break;
//             case 'final':
//             response.send({
//                 speech:
//                     ` Final exam will starts on 10 july` +

//                     `Do you need to ask another question ( yes, no)?`
//             });
//             break;
//             case 'secondround':
//             response.send({
//                 speech:
//                     ` Second round will starts on 9 september` +

//                     `Do you need to ask another question ( yes, no)?`
//             });
//             break;
//             case 'entranceExam':
//             response.send({
//                 speech:
//                 ` Entrance exam for the year 2018-2019 will starts on 15 july.
//                 Do you need to know more about this exam ( yes, no)? `
//             });
//             break;
//             case 'document':
//             response.send({
//                 speech:
//                     ` Documents required for the entrance exam 2018-2019 :`
//                      +
//              `  1- صورة عن اخراج القيد 
//                 2- صورة عن بطاقة الترشيح
//                 3- صورتين شمسيتين
//                 4- طابع مالي
//                     `

//             });

//             break;
//         default:
//             response.send({
//                 speech: "no action matched in webhook"
//             })

//     }

// });








// var admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
// var firestore= admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//



// exports.webhook = functions.https.onRequest((request, response) => {

//     console.log("request.body.result.parameters: ", request.body.result.parameters);

//     let params = request.body.result.parameters;

//  firestore.collection('order').add(params)
// .then(()=> {
//         response.send({

//                 speech: 
//                         `your email address ${ params.email } is saved to firebase database`


                //  });

// })

//  .catch((e=>{

//    console.log("error: ", e);

//         response.send({

//         speech: "something went wrong when writing on database"


//                  });


//  }))


