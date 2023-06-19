/**
* Template Name: BizPage - v5.1.0
* Template URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
// this enables prefers-color-scheme media queries (transformed by PostCSS)
prefersColorScheme = initPrefersColorScheme('dark');

// this runs every time the preferred color scheme changes (by the OS or manually)
prefersColorScheme.onChange = function () {
	document.getElementById('preferred-color-scheme').lastChild.data = prefersColorScheme.scheme;
};

// let’s run it now
prefersColorScheme.onChange();

var contentType = '';

 saveImage()=function(){
  var textToWrite = document.getElementById("inputTextToSave").value;

  var splittedTextToWrite = textToWrite.split(",");

  var u16 = new Uint16Array(splittedTextToWrite.length);

    for(i=0; i<splittedTextToWrite.length; i++){
        u16[i]=splittedTextToWrite[i];
    }
  var textFileAsBlob = new Blob([u16], {type: contentType});          

  var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL !== null) {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  }
  else {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}

loadImage = function() {
  var file = document.getElementById("fileToLoad").files[0];

  var reader = new FileReader();
  reader.onload = function(event) {
    var data = event.target.result;

    var data16 = new Uint16Array(data);
    var text = [];
      for(i = 0; i<data16.length; i++){
          text.push(data16[i]);
      }

    document.getElementById("inputTextToSave").value = text;

    var imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = '';

    var dataURLReader = new FileReader();
    dataURLReader.onload = function(event) {
      // Parse image properties
      var dataURL = event.target.result;
      contentType = dataURL.split(",")[0].split(":")[1].split(";")[0];

      var image = new Image();
      image.src = dataURL;
      image.onload = function() {
        console.log("Image type: " + contentType);
        console.log("Image width: " + this.width);
        console.log("Image height: " + this.height);
        imagePreview.appendChild(this);
      };
    };
    dataURLReader.readAsDataURL(file);


  };
  //reader.readAsBinaryString(file);
  reader.readAsArrayBuffer(file);

}

function 
onSignIn(googleUser) {
  console.log(googleUser)
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  // or fetch() is native in browsers
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  
gapi.auth2.authorize({
  client_id: '438652394528-dgmj06pmapahrf8gi8hn26pfp94fnn0s.apps.googleusercontent.com.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/calendar',
  response_type: 'id_token permission'
}, function(response) {
  if (response.error) {
    // An error happened!
    return;
  }

  // The user authorized the application for the scopes requested.
  var accessToken = response.access_token;
  var idToken = response.id_token;
  // You can also now use gapi.client to perform authenticated requests.
});
//   var resource = {
//     "summary": "Appointment",
//     "location": "Somewhere22",
//     "start": {
//       "dateTime": "2021-12-16T10:00:00.000-07:00"
//     },
//     "end": {
//       "dateTime": "2021-12-16T10:25:00.000-07:00"
//     }
//   };
//   const {google} = require('googleapis');
//    const calendar = google.calendar('v3');
//   var ret = gapi.client.load('calendar', 'V3', makeApiCall);
//   var request = ret.events.insert({
//     'calendarId': 'primary',
//     'resource': resource
//   });
//   request.execute(function(resp) {
//     console.log(resp);
//   });
//   console.log("hello") // This is null if the 'email' scope is not present.
// } 
// var app = angular.module('eventsApp', ['angular-loading-bar', 'googleApi', 'treeGrid', 'ngNotify']);

// app.config(function(googleLoginProvider) {
//     googleLoginProvider.configure({
//         clientId: '271838702018-jcc58isp1cu2c9j35rpv6i57mbrtcu71.apps.googleusercontent.com',
//         scopes: ["https://www.googleapis.com/auth/userinfo.email", 
//         	     "https://www.googleapis.com/auth/calendar", 
//         	     "https://www.googleapis.com/auth/plus.login"]
//     });});
}
app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true; // Show the spinner.
    cfpLoadingBarProvider.includeBar = true; // Show the bar.
}]);
app.controller('mainCtrl', ['$scope', 'googleLogin', 'googleCalendar', 'googlePlus', 'cfpLoadingBar', 'ngNotify', function ($scope, googleLogin, googleCalendar, googlePlus, cfpLoadingBar, ngNotify) {
   


    $scope.tree_data = new Array();

    $scope.newEvent = {
        summary: '',
        description: '',
        startDateTime:'',
        endDateTime:''
    };
    $scope.eventOld = {};

    $scope.resetAddForm = function ()
    {
        $scope.newEvent.startDateTime = moment(new Date()).format('MM/DD/YYYY h:mm A');
        //initialy add one hour to end DateTime
        var date = new Date();
        date.setHours(date.getHours() + 1);
        $scope.newEvent.endDateTime = moment(date).format('MM/DD/YYYY h:mm A');
        $scope.newEvent.summary = "";
        $scope.newEvent.description = "";
    }
    $scope.resetAddForm();
    var myTreeData = new Array();
    ngNotify.config({
        theme: 'pure',
        position: 'bottom',
        duration: 1000,
        sticky: false,
        html: false,
        target: '#modular'
    });
    
    $scope.expanding_property = {
        field: "summary",
        displayName: "Title",
        sortable: true,
        filterable: true,
        cellTemplate: "<a ng-click = 'user_clicks_branch(row.branch)'>{{row.branch[expandingProperty.field]}}</a>",
    };
    $scope.col_defs = [
       {
           field: "htmlLink",
           displayName: "Event link",
           sortable: true,
           cellTemplate: "<span  ng-switch='row.branch[col.field]'><a class='btn btn-success' ng-switch-default ng-href='{{row.branch[col.field]}}' target='_blank'> <span class='glyphicon glyphicon-link' aria-hidden='true' ></span> </a></span>",
           sortingType: "number",
           filterable: true
       },
       {
           field: "startDateTime",
           displayName: "Starts on",
           sortable: true,
           cellTemplate: "<p style='display:inline !important' >{{row.branch[col.field]}}</p>",
           sortingType: "string"
       },
       {
           field: "endDateTime",
           displayName: "Ends on",
           sortable: true,
           sortingType: "string"
       },
       {
           field: "Actions",
           displayName: "Actions",
           cellTemplate: "<button id='viewMe{{row.branch.id}}' style='margin-bottom:3px' ng-click='cellTemplateScope.clickView(row.branch)' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#viewEventModal' ><span class='glyphicon glyphicon-info-sign' aria-hidden='true' ></span> Details</button>" +
                         " " +
                         "<button ng-click='cellTemplateScope.clickEdit(row.branch)' style='margin-bottom:3px' class='btn btn-warning btn-xs' data-toggle='modal' data-target='#editEventModal' ><span class='glyphicon glyphicon-pencil' aria-hidden='true' ></span> Edit</button>" +
                         " " +
                         "<button ng-click='cellTemplateScope.clickDel(row.branch)' style='margin-bottom:3px' class='btn btn-danger btn-xs' data-toggle='modal' data-target='#deleteEventModal'  > <span class='glyphicon glyphicon-remove' aria-hidden='true' ></span> Delete</button>",
           cellTemplateScope: {
               clickEdit: function (data) {
                   $scope.eventOld = {};
                    angular.copy(data, $scope.eventOld);
                    $scope.event = data;

                    angular.element('#startDateTimePicker').val(data.startDateTime);
                    angular.element('#endDateTimePicker').val(data.endDateTime);
                },
               clickDel: function (data) {
                    $scope.event = data;
                },
                clickView: function (data) {
                    $scope.event = data;
               }
           }
       }
    ];
       $scope.login = function () {
           googleLogin.login();
       };

       $scope.$on("googlePlus:loaded", function() {
         googlePlus.getCurrentUser().then(function(user) {
             $scope.currentUser = user;
             $scope.currentUser.image.url
           console.log(user);
           $scope.loadCalendars();
           ngNotify.set('Welcome '+user.displayName+'!', 'success');
   
         });
       })

        $scope.$on("google:ready", function() {
        //authorization after google api is loaded 
            googleLogin.login().then(function (data) {  
            });
         });
       
        $scope.currentUser = googleLogin.currentUser;

       $scope.loadCalendars = function () {
           googleCalendar.listCalendars().then(function (data) {
               $scope.calendars = data;
               $scope.selectedCalendar = $scope.calendars[0];
               $scope.loadEvents();
           });
       }
       $scope.loadEvents = function () {
           clearTable();
           cfpLoadingBar.start();
            googleCalendar.listEvents({ calendarId: this.selectedCalendar.id })
               .then(function (events) {
                   for(var i=0;i<events.length;i++)
                   {
                       console.log(events[i]);
                       var event = {
                           id:"",
                           summary: "",
                           creator: "",
                           startDateTime: "",
                           endDateTime: "",
                           created: "",
                           updated:"",
                           description: "",
                           location: "",
                           attachments: [],
                           htmlLink:""
                       }
                       event.id = events[i].id;
                       event.summary = events[i].summary;
                       event.creator = events[i].creator.displayName;
                       //for all-day events
                       if (events[i].end.dateTime)
                           event.startDateTime = moment(events[i].start.dateTime).format('MM/DD/YYYY h:mm A');
                       else
                           event.startDateTime = moment(events[i].start.date).format('MM/DD/YYYY');
                       if(events[i].end.dateTime)
                           event.endDateTime = moment(events[i].end.dateTime).format('MM/DD/YYYY h:mm A');
                       else
                           event.endDateTime = moment(events[i].end.date).format('MM/DD/YYYY');
                       event.created = moment(events[i].created).format('MM/DD/YYYY h:mm A');
                       event.updated = moment(events[i].updated).format('MM/DD/YYYY h:mm A');

                       event.description = events[i].description;
                       event.location = events[i].location;
                       event.htmlLink = events[i].htmlLink;
                       
                       if (events[i].attachments) {
                           for (var j = 0; j < events[i].attachments.length; j++)
                               event.attachments.push({
                                   title: events[i].attachments[j].title,
                                   fileUrl: events[i].attachments[j].fileUrl,
                                   iconLink: events[i].attachments[j].iconLink
                               });
                          
                       }
                       myTreeData.push(event);
                   }
                   $scope.tree_data = myTreeData;
                   cfpLoadingBar.complete();

                    }
               );
       }
       $scope.editEvent = function(data)
       {
           console.log($scope.event);
           
           var event = {
               summary: '',
               description: '',
               start: {
                   dateTime: '',
               },
               end: {
                   dateTime: '',
                  
               },
               location:''
           };
           event.summary = data.summary;
           event.description = data.description;

           $scope.event.summary = data.summary;
           $scope.event.description = data.description;

           //two-way binding didin't work with datetimepicker values, so I fixed it manually :(
           event.start.dateTime = new Date(angular.element('#startDateTimePicker').val());
           
           $scope.event.startDateTime = moment(event.start.dateTime).format('MM/DD/YYYY h:mm A');
           event.end.dateTime = new Date(angular.element('#endDateTimePicker').val());
           $scope.event.endDateTime = moment(event.end.dateTime).format('MM/DD/YYYY h:mm A');
           if(data.location)
               event.location = data.location;
           googleCalendar.updateEvent({ calendarId: this.selectedCalendar.id, eventId: data.id, resource: event })
                          .then(function (data) {
                              ngNotify.set('Successfully updated event!', 'success');
                          }, function (response) {
                              console.log(response);
                              ngNotify.set('Error while updating event due to: ' + response.message,{type:'error',duration:3000});
                          });
          

       }
       $scope.cancel = function()
       {
           //restore orignial values
           angular.copy($scope.eventOld, $scope.event)

           console.log($scope.eventOld);
       }
       $scope.deleteEvent= function()
       {
          
           googleCalendar.deleteEvent({ calendarId: this.selectedCalendar.id, eventId: $scope.event.id })
                          .then(function (data) {
                              ngNotify.set('Event deleted!', 'success');
                              var index = $scope.tree_data.indexOf($scope.event);
                              $scope.tree_data.splice(index, 1);
                          }, function (response) {
                              console.log(response);
                              ngNotify.set('Event deletion failed due to: ' + response.message, { type: 'error', duration: 3000 });
                          });

       }

       $scope.addEvent = function (data) {       
           var event = {
               summary: '',
               description: '',
               start: {
                   dateTime: '',
               },
               end: {
                   dateTime: '',
               },
           };

           event.summary = data.summary;
           event.description = data.description;
           //two-way binding didin't work with datetimepicker values, so I fixed it manually :(
           event.start.dateTime = new Date(angular.element('#startDateTimePickerNew').val());
           $scope.newEvent.startDateTime = moment(event.start.dateTime).format('MM/DD/YYYY h:mm A');
           event.end.dateTime = new Date(angular.element('#endDateTimePickerNew').val());
           $scope.newEvent.endDateTime = moment(event.end.dateTime).format('MM/DD/YYYY h:mm A');
           console.log(event);
           googleCalendar.insertEvent({calendarId: this.selectedCalendar.id, resource: event})
                          .then(function (data) {
                              ngNotify.set('Event created!', 'success');
                              console.log(data);
                              var event = {
                                  id: "",
                                  summary: "",
                                  creator: "",
                                  startDateTime: "",
                                  endDateTime: "",
                                  created: "",
                                  updated: "",
                                  description: "",
                                  location: "",
                                  attachments: [],
                                  htmlLink: ""
                              }
                              event.id = data.id;
                              event.summary = data.summary;
                              event.creator = data.creator.displayName;
                              if (data.end.dateTime)
                                  event.startDateTime = moment(data.start.dateTime).format('MM/DD/YYYY h:mm A');
                              else
                                  event.startDateTime = moment(data.start.date).format('MM/DD/YYYY');
                              if (data.end.dateTime)
                                  event.endDateTime = moment(data.end.dateTime).format('MM/DD/YYYY h:mm A');
                              else
                                  event.endDateTime = moment(data.end.date).format('MM/DD/YYYY');
                              event.created = moment(data.created).format('MM/DD/YYYY h:mm A');
                              event.updated = moment(data.updated).format('MM/DD/YYYY h:mm A');
                              event.description = data.description;
                              event.location = data.location;
                              event.htmlLink = data.htmlLink;

                              if (data.attachments) {
                                  for (var j = 0; j < data.attachments.length; j++)
                                      event.attachments.push({
                                          title: data.attachments[j].title,
                                          fileUrl: data.attachments[j].fileUrl,
                                          iconLink: data.attachments[j].iconLink
                                      });
                              }
                              $scope.tree_data.push(event);
                          }, function (response) {
                              console.log(response);
                              ngNotify.set('Event creation failed due to: ' + response.message, { type: 'error', duration: 3000 });
                          });

       }
       function clearTable() {         
           $scope.tree_data = [];
           myTreeData = [];
       };

   }]);

// var CLIENT_ID = '438652394528-dgmj06pmapahrf8gi8hn26pfp94fnn0s.apps.googleusercontent.com';
// var API_KEY = '<YOUR_API_KEY>';

// // Array of API discovery doc URLs for APIs used by the quickstart
// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// // Authorization scopes required by the API; multiple scopes can be
// // included, separated by spaces.
// var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

// var authorizeButton = document.getElementById('authorize_button');
// var signoutButton = document.getElementById('signout_button');

// /**
//  *  On load, called to load the auth2 library and API client library.
//  */
// function handleClientLoad() {
//   gapi.load('client:auth2', initClient);
// }
// angular.module('googleApi', [])
// 	.value('version', '0.1')

//     .service("googleApiBuilder", function($q) {
//         this.loadClientCallbacks = [];

//         this.build = function(requestBuilder, responseTransformer) {
//             return function(args) {
//                 var deferred = $q.defer();
//                 var response;
//                 request = requestBuilder(args);
//                 request.execute(function(resp, raw) {
//                     if(resp.error) {
//                         deferred.reject(resp.error);
//                     } else {
//                         response = responseTransformer ? responseTransformer(resp) : resp;
//                         deferred.resolve(response);
//                     }

//                 });
//                 return deferred.promise;

//             }
//         };

//         this.afterClientLoaded = function(callback) {
//             this.loadClientCallbacks.push(callback);
//         };

//         this.runClientLoadedCallbacks = function() {
//             for(var i=0; i < this.loadClientCallbacks.length; i++) {
//                 this.loadClientCallbacks[i]();
//             }
//         };
//     })

//     .provider('googleLogin', function() {

//         this.configure = function(conf) {
//             this.config = conf;
//         };

//         this.$get = function ($q, googleApiBuilder, $rootScope) {
//             var config = this.config;
//             var deferred = $q.defer();
//             var svc = {
//                 login: function () {
//                     gapi.auth.authorize({ client_id: config.clientId, scope: config.scopes, immediate: false}, this.handleAuthResult);

//                     return deferred.promise;
//                 },
//                 handleAuthResult: function(authResult) {
//                     if (authResult && !authResult.error) {
//                         var data = {};
//                         $rootScope.$broadcast("google:authenticated", authResult);
//                         googleApiBuilder.runClientLoadedCallbacks();
//                         deferred.resolve(data);
//                     } else {
//                         deferred.reject(authResult.error);
//                     }
//                 },
//             };

//             // load the gapi client, instructing it to invoke a globally-accessible function when finished
//             window._googleApiLoaded = function() {
//                 gapi.auth.init(function () {
//                     $rootScope.$broadcast("google:ready", {});
//                 });
//             };
//             var script = document.createElement('script');
//             script.setAttribute("type","text/javascript");
//             script.setAttribute("src", "https://apis.google.com/js/client.js?onload=_googleApiLoaded");
//             document.getElementsByTagName("head")[0].appendChild(script);

//             return svc;
//         };
//     })

//     .service("googleCalendar", function(googleApiBuilder, $rootScope) {

//         var self = this;
//         var itemExtractor = function(resp) { return resp.items; };

//         googleApiBuilder.afterClientLoaded(function() {
//             gapi.client.load('calendar', 'v3', function() {

//                 self.listCalendarColors = googleApiBuilder.build(gapi.client.calendar.colors.get);

//                 self.createEvent = googleApiBuilder.build(gapi.client.calendar.events.quickAdd);
//                 self.deleteEvent = googleApiBuilder.build(gapi.client.calendar.events.delete);
//                 self.insertEvent = googleApiBuilder.build(gapi.client.calendar.events.insert);
//                 self.updateEvent = googleApiBuilder.build(gapi.client.calendar.events.update);
//                 self.listEvents = googleApiBuilder.build(gapi.client.calendar.events.list, itemExtractor);

//                 self.createCalendar = googleApiBuilder.build(gapi.client.calendar.calendars.insert);
//                 self.deleteCalendar = googleApiBuilder.build(gapi.client.calendar.calendars.delete);
//                 self.updateCalendar = googleApiBuilder.build(gapi.client.calendar.calendars.update);
//                 self.listCalendars = googleApiBuilder.build(gapi.client.calendar.calendarList.list, itemExtractor);

//                 $rootScope.$broadcast("googleCalendar:loaded")
//             });

//         });

//     })

// 		.service("googlePlus", function(googleApiBuilder, $rootScope) {

// 				var self = this;
// 				var itemExtractor = function(resp) { return resp.items; };

// 				googleApiBuilder.afterClientLoaded(function() {
// 						gapi.client.load('plus', 'v1', function() {
// 							self.getPeople = googleApiBuilder.build(gapi.client.plus.people.get);
//                             self.listPeople = googleApiBuilder.build(gapi.client.plus.people.list);
// 							self.getCurrentUser = function() {
// 								return self.getPeople({userId: "me"});
// 							}
// 							$rootScope.$broadcast("googlePlus:loaded")
// 						});

// 				});

// 		})

// /**
//  *  Initializes the API client library and sets up sign-in state
//  *  listeners.
//  */
// function initClient() {
//   gapi.client.init({
//     apiKey: API_KEY,
//     clientId: CLIENT_ID,
//     discoveryDocs: DISCOVERY_DOCS,
//     scope: SCOPES
//   }).then(function () {
//     // Listen for sign-in state changes.
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//     // Handle the initial sign-in state.
//     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     authorizeButton.onclick = handleAuthClick;
//     signoutButton.onclick = handleSignoutClick;
//   }, function(error) {
//     appendPre(JSON.stringify(error, null, 2));
//   });
// }

// /**
//  *  Called when the signed in status changes, to update the UI
//  *  appropriately. After a sign-in, the API is called.
//  */
// function updateSigninStatus(isSignedIn) {
//   if (isSignedIn) {
//     authorizeButton.style.display = 'none';
//     signoutButton.style.display = 'block';
//     listUpcomingEvents();
//   } else {
//     authorizeButton.style.display = 'block';
//     signoutButton.style.display = 'none';
//   }
// }

// /**
//  *  Sign in the user upon button click.
//  */
// function handleAuthClick(event) {
//   gapi.auth2.getAuthInstance().signIn();
// }

// /**
//  *  Sign out the user upon button click.
//  */
// function handleSignoutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }

// /**
//  * Append a pre element to the body containing the given message
//  * as its text node. Used to display the results of the API call.
//  *
//  * @param {string} message Text to be placed in pre element.
//  */
// function appendPre(message) {
//   var pre = document.getElementById('content');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }

// /**
//  * Print the summary and start datetime/date of the next ten events in
//  * the authorized user's calendar. If no events are found an
//  * appropriate message is printed.
//  */
// function listUpcomingEvents() {
//   gapi.client.calendar.events.list({
//     'calendarId': 'primary',
//     'timeMin': (new Date()).toISOString(),
//     'showDeleted': false,
//     'singleEvents': true,
//     'maxResults': 10,
//     'orderBy': 'startTime'
//   }).then(function(response) {
//     var events = response.result.items;
//     appendPre('Upcoming events:');

//     if (events.length > 0) {
//       for (i = 0; i < events.length; i++) {
//         var event = events[i];
//         var when = event.start.dateTime;
//         if (!when) {
//           when = event.start.date;
//         }
//         appendPre(event.summary + ' (' + when + ')')
//       }
//     } else {
//       appendPre('No upcoming events found.');
//     }
//   });
// }
calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin ],
  initialView: 'dayGridWeek'
});
var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'dayGridWeek'
});
