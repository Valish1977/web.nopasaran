<template>
<div>
	<!-- Page Title Section START -->
	<div id="top-block" class="section-block" :style="'background-image: url('+((this.location === '')?'../../theme/':'../../../theme/') + this.theme.topBackground + ');'"  v-if="issetEvent || this.issetURLEvent">
		<div class="container">
			<div class="row" v-if="viewOld || ( !activeURLEvent && !nextRout && active === 'closed' ) ">
				<div class="col-12">
					<p class="free"><span style="background-color:red; font-size:2em; padding:5px">{{$t('event.past')}}</span></p>
				</div>
			</div>
      <!-- <div class="row" v-if="active === 'now'">
				<div class="col-12">
					<p class="free"><span style="background-color:green; font-size:2em; padding:5px">{{$t('event.now')}}</span></p>
				</div>
			</div> -->
			<div class="row">
				<div class="col-12">
					<p class="free" style="word-wrap:break-word"><span>{{getText('topic')}}</span></p>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-8 col-md-6 col-sm-6 col-xs-12">
					 <h1 class="title" style="word-wrap:break-word"><span>{{getText('descr')}}</span></h1>
					 <div class="row" style="padding-top:30px">
				    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-6">
				    	<p class="free"><span>{{getText('date')}}</span></p>
				    </div>
				    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-6">
				    	<p class="free"><span>{{getText('time')}}</span></p>
				    </div>
				    <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
				    	<p class="free"><span>{{getText('adress')}}</span></p>
				    </div>
			     </div>
           </div>
				   <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
			      <b-card  v-if="( !viewOld  && activeURLEvent && active === 'soon') || nextRout">
				      <b-form @submit="onSubmit" @reset="onReset" v-show="show">	
              	<b-form-group breakpoint="lg" :label="$t('event.form.title')" label-size="lg" label-class="font-weight-bold pt-0" class="mb-0">
              	  <b-form-group :label="$t('event.form.name')" label-class="text-sm-right" label-for="nestedStreet"><b-form-input @change="changeField('name')" :state="formData.name.state" type="text" v-model="form.name"></b-form-input></b-form-group>
              	  <b-form-group :label="$t('event.form.email')" label-class="text-sm-right" label-for="nestedStreet"><b-form-input @change="changeField('email')" :state="formData.email.state" type="email" v-model="form.email"></b-form-input></b-form-group>
              	</b-form-group>
				  	    <b-button class="btn float-right" type="submit" variant="success" style="margin-top:20px">{{$t('event.participator')}}</b-button>
       	  		</b-form>	
				  	</b-card>		
				  </div>
			 </div>
       <div v-if="clubLink !== '' && clubLink !== null" class="row" style="padding-top:30px">
			  <div class="col-xs-12">
				  <p class="free" style="background-color:#fff; margin-left:15px"><span><a style="padding:5px" :href="clubLink">{{$t('event.oficial_page')}}</a></span></p>
			  </div>
		  </div>
		</div>
	</div>


	<div class="page-title-section" :style="'background-image: url('+((this.location === '')?'../../theme/':'../../../theme/')+'bg.jpg);'" v-if="!issetEvent && !issetURLEvent">
		<div class="container">
			<div class="page-title center-holder">
				<h1 v-show="loadContent == 0">{{$t('event.notFound')}}</h1>
<!-- 	        <ul>
	        	<li><router-link to="/clubs/0">{{$t('event.getIndex')}}</router-link></li>
						<li><router-link to="/events/0">{{$t('event.getEvents')}}</router-link></li>
				</ul> -->
			</div>
		</div>
	</div>

	


	<div class="section-block-grey" v-if="(issetEvent || this.issetURLEvent) && content.length > 0" >
	<div class="container">
		<div class="section-heading center-holder">
			<h2>{{$t('event.content')}}</h2>
		</div>
		<template v-for="(value, index) in eventItem.econtent">
			<div class="blog-list" :key="index">
				<div class="row">
					<div class="col-md-8 col-sm-12 col-xs-12" >
						<div  class="trangle"></div>
						<div  class="trangleText">{{index+1}}</div>
						<img :src="'/r/x600/' + eventItem.econtent[index].photoAlias" alt="blog-image">
					</div>
					<div class="col-md-4 col-sm-12 col-xs-12">
						<div class="blog-list-text">	
							<h3><a>{{eventItem.econtent[index].topic}}</a></h3>
							<p>{{eventItem.econtent[index].descr}}</p>
							<div class="blog-list-admin">
								<a>{{eventItem.econtent[index].speaker}}</a>
							</div>			
						</div>
					</div>	
				</div>
			</div>
		</template>
	</div>
</div>
<!-- Service Boxes END -->

<!-- Services START -->
<div class="section-block" v-if="(issetEvent || this.issetURLEvent) && materials.length > 0" >
	<div class="container">
		<div class="section-heading center-holder">
			<h2>{{$t('event.materials')}}</h2>
		</div>	
		<div class="row">	
			<template v-for="(value, index) in eventItem.ematerials">
				<div class="testmonial-block col-md-6 col-sm-6 col-xs-12" :key="index">
					<div class="testmonial-img">
						<img src="/theme/book.jpg" alt="testmonial-img" style="border-radius:10%; opacity: 0.7;">
					</div>
					<div class="testmonial-text">
						<div class="ml-15">			
							<strong style="color:#28a745">{{eventItem.ematerials[index].author}}</strong>	
							<p v-if="eventItem.ematerials[index].link === ''" style="color:#676767">{{eventItem.ematerials[index].name}}</p>	
							<a :href="eventItem.ematerials[index].link" v-else><span style="color:#676767">{{eventItem.ematerials[index].name}}</span></a>
						</div>	
					</div>								
				</div>
			</template>
		</div>
	</div>
</div>


<div class="section-block-grey" v-if="listEventsNew.length > 0 || listEventsOld.length > 0">
		<div class="container">
			<div class="row" v-if="listEventsNew.length > 0">
				<div class="col-12">
					<h3 class="title"><span>{{$t('event.pastEvents')}}</span></h3>
						<ol>
							<li style="list-style-type: none" v-for="(value, index) in listEventsNew" :key="index">
                <span style="font-size:12px">( {{getText('date', listEventsNew[index].edate)}} ) </span>
                <router-link  v-if="listEventsNew[index].id !== id" :to="'/event/new/'+listEventsNew[index].id"><span>{{listEventsNew[index].descr}}</span></router-link>
                <span v-else>{{listEventsNew[index].descr}}</span>
              </li>
						</ol>
				</div>
			</div>
			<div class="row" v-if="listEventsOld.length > 0">
					<div class="col-12">
						<h3 class="title"><span>{{$t('event.lastEvents')}}</span></h3>
						<ol>
							<li style="margin-top:20px" v-for="(value, index) in listEventsOld" :key="index">
                <span style="font-size:12px">( {{getText('date', listEventsOld[index].edate)}} ) </span>
                <router-link v-if="listEventsOld[index].id !== id" :to="'/event/old/'+listEventsOld[index].id"><span>{{listEventsOld[index].descr}}</span></router-link>
                <span v-else>{{listEventsOld[index].descr}}</span>
              </li>
						</ol>
					</div>
				</div>
		</div>
	</div>


<div class="section-block">
	<div class="container">
		<div class="section-heading center-holder">
			<h2>{{$t('event.thenHelp')}}</h2>
			<p>{{$t('event.thenHelpText')}}</p>
		</div>	
		<div class="row">
			<div class="col-md-4 col-sm-4 col-xs-12">
				<div class="service-block">
					<img src="/theme/11.png" alt="service-image">
					<div class="inner-padd clearfix">
						<div class="service-block-content">
							<h4>{{$t('event.postingAds')}}</h4>	
						</div>
            <span v-show="loadPdf > 0"><div class="fileDownload"></div></span>	
						<span v-show="loadPdf == 0" class="fileDownloadIcon"><font-awesome-icon icon="file-download"  @click="createPdf()" style="width:40px; font-size:40px; color:#18ba60" /></span>						
					</div>
				</div>
			</div>

			<div class="col-md-4 col-sm-4 col-xs-12">
				<div class="service-block">
					<img src="/theme/12.png" alt="service-image">
					<div class="inner-padd clearfix">
						<div class="service-block-content">
							<h4>{{$t('event.leafletDistribution')}}</h4>	
						</div>
            <span v-show="loadPdfList"><div class="fileDownload"></div></span>	
						<span v-show="!loadPdfList" class="fileDownloadIcon"><font-awesome-icon icon="file-download" @click="createPdfList()" style="width:40px; font-size:40px; color:#18ba60" /></span>									
					</div>
				</div>
			</div>

			<div class="col-md-4 col-sm-4 col-xs-12">
				<div class="service-block">
					<img src="/theme/13.jpg" alt="service-image">
					<div class="inner-padd clearfix">
						<div class="service-block-content">
							<h4>{{$t('event.projectAssistance')}}</h4>	
						</div>
						<span  class="fileDownloadIcon"><font-awesome-icon icon="credit-card" style="width:40px; font-size:40px; color:#18ba60" /></span>									
					</div>
				</div>
			</div>													
		</div>
	</div>
</div>

<!-- Services END -->
  <b-modal :visible="myModal" @cancel="myModal=false" :title="modal.title" ok-only hide-footer>
    <p style="color:red">
			{{modal.text}}
    </p>
  </b-modal>
</div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import qr from 'qr-image-color';
import appconfig from '@/appconfig';
import bus from '@/bus';

@Component
export default class Event extends Vue {
  private theme: any = {
    topBackground : 'theme1.jpg',
    stickerIcon : 'politic.jpg',
  };
  private eventItem: any = {
    edate : { String : ''},
    topic : { String : ''},
    descr : { String : ''},
    adress : { String : ''},
  };
  private active: string = 'closed';
  private modal: any = {title: '', text: ''};
  private issetCircle: boolean = false; // Существует кружок или нет
  private issetURLEvent: boolean = false; // Существует событие из URL или нет
  private activeURLEvent: boolean = false; // Активно событие из URL или нет
  private issetEvent: boolean = false; // есть выводимое активное событие в общем
  private form: any = {};
  private show: boolean = true;
  private id: number = 0;
  private clubLink: string = '';
  private location: string = '';
  private content: any = [];
  private materials: any = [];
  private listEventsOld: any = [];
  private listEventsNew: any = [];
  private viewOld: boolean = false;
  private nextRout: boolean = false;
  private myModal: boolean = false;
  private def: any = {};
  private loadContent: number = 0;
  private loadData: boolean = false;
  private loadPdf: number = 0;
  private loadPdfList: boolean = false;
  private formData: any = {
    name: {state: null, default: null, typeResult: 'string', defaultResult: null, nullResult: false},
    email: {state: null, default: null, typeResult: 'string', defaultResult: null, nullResult: false},
  };
  constructor() {
    super();
    for (const v of Object.keys( this.formData )) {
      if (this.formData.hasOwnProperty( v )) {
        this.form[v] = this.formData[v].default;
      }
    }
  }
  private created(): void {
    this.updateUrl();
  }
  @Watch('$route')
  private watchView(to, from): void { // отрабатывает при смене роута
    this.updateUrl();
  }
  @Watch('loadContent')
  private watchloadContent(): void { // отслеживаем кол-во загружаемых элементов
    if (this.loadContent === 0) {
      for ( const i in this.eventItem.econtent ) { // отображаем контент
        if (this.eventItem.econtent.hasOwnProperty(i)) {
          this.content.push(i);
        }
      }
    }
  }

  private async createPdf() {
    this.loadPdf = 3;
    const pdf = pdfMake;
    pdf.vfs = pdfFonts.pdfMake.vfs;
    let https = 'nopasaran.su/event/new/' + this.id;
    if (this.location !== '') {
      https = 'nopasaran.su/event/new/' + this.id + '/' + this.location;
    }
    const qrPng = qr.imageSync(
      https,
      { type: 'png', color: [0, 0, 0], transparent: false, margin: 0 },
     // { type: 'png', color: [178, 34, 34], transparent: false }, // красный
    );
    const body: any = [];
    const url = ((this.location === '') ? '../../theme/' : '../../../theme/');
    const background = await this.getBase64FromImageUrl(url + 'sticker2.png');
    const stickerIcon = await this.getBase64FromImageUrl(url + 'politic.jpg');
    const styles = {
      tableExample: {
        margin: [0, 0, 0, 5],
      },
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'right',
        margin: [0, 0, 0, 0],
      },
      header2: {
        fontSize: 15,
        bold: true,
        alignment: 'right',
        margin: [0, 0, 0, 0],
      },
      speaker: {
        fontSize: 11,
        alignment: 'right',
        margin: [0, 0, 0, 0],
        color: '#000000',
        /* color: '#B22222', // красный */
      },
      subheader: {
        fontSize: 11,
        color: '#000000',
        /* //color: '#B22222', // красный */
      },
      superMargin: {
        margin: [20, 0, 40, 0],
        fontSize: 15,
      },
    };

    let content: any = [];
    // Те кому дорог СССР
    for ( let i = 0; i <= 3; i++ ) {
      const row: any = [];
      for (let c = 0; c <= 1; c++) {
        const item: any = {table: {body: [[{border: [false, false, false, false],margin: [0, 0, 0, 0], style: 'tableExample', alignment: 'right',table: {widths: [208, 40], body: [[{image: background,width: 218,margin: [0, 0, 0, 0],alignment: 'left'},{}]]},layout: {defaultBorder: false}}],[{border: [false, false, false, false],margin: [0, 0, 0, 0],style: 'tableExample',alignment: 'left',table: {widths: [200, 60], body: [[{text: [{text: this.getText('url') + "\n", alignment: 'left', style: 'speaker'},{text: this.clubLink + "\n", alignment: 'left', style: 'speaker'},{text: this.getText('adress'), alignment: 'left', style: 'speaker'}]},{border: [false, false, false, false], image: qrPng, width: 60, margin: [0, 0, 0, 0], alignment: 'center'}]]},layout: {defaultBorder: false}}]]}};
        row.push(item);
      }
      content.push(row);
    }

    const def: any = {
        // background: {image: background},
        pageSize: 'A4',
        pageMargins: [0, 0, 0, 0],
        pageOrientation: 'portrait',
        content: [
        {
          margin: [0, 0, 0, 0],
          style: 'tableExample',
          table: {
            widths: [289, 289],
            body: content,
        },
      },
    ],
    
    styles: styles,
    };
    
    content = [];
    // серп и молот
    for ( let i = 0; i <= 3; i++ ) {
      const row: any = [];
      for (let c = 0; c <= 1; c++) {
        const item: any = {table: {body: [[{border: [false, false, false, false], margin: [0, 5, 0, 0], text: this.eventItem.topic, alignment: 'center', style: 'subheader'}], [{border: [false, false, false, false], margin: [0, 0, 0, 0], style: 'tableExample', alignment: 'right', table: {widths: [70, '*', 70], body: [[{image: stickerIcon, width: 70, margin: [0, 0, 0, 0], alignment: 'center'}, {border: [false, false, false, false], image: qrPng, width: 70, margin: [0, 0, 0, 0], alignment: 'center'}, {image: stickerIcon, width: 70, margin: [0, 0, 0, 0], alignment: 'center'}]]}, layout: {defaultBorder: false}}], [{border: [false, false, false, false], margin: [0, 0, 0, 0], text: this.getText('url'), alignment: 'center', style: 'speaker'}], [{border: [false, false, false, false], margin: [0, 0, 0, 0], text: this.clubLink, alignment: 'center', style: 'speaker'}], [{border: [false, false, false, false], margin: [0, 0, 0, 5], text: this.getText('adress'), alignment: 'center', style: 'speaker'}]]}};
        row.push(item);
      }
      content.push(row);
    }
    const defOld: any = { // серп и молот
        // background: {image: background},
      pageSize: 'A4',
      pageMargins: [0, 0, 0, 0],
      pageOrientation: 'portrait',
      content: [
        {
          margin: [0, 0, 0, 0],
          style: 'tableExample',
          table: {
            widths: [298, 298],
            body: content,
          },
        },
      ],
    
    styles: styles,
    };
    content = [];
    for ( let i = 0; i <= 2; i++ ) {
      const row: any = [];
      for (let c = 0; c <= 1; c++) {
        const item: any = {table: {body: [[{border: [false, false, false, false], margin: [0, 5, 0, 0], text: this.eventItem.topic, alignment: 'center', style: 'subheader'}], [{border: [false, false, false, false], image: qrPng, width: 100, margin: [0, 0, 0, 0], alignment: 'center'}], [{border: [false, false, false, false], margin: [0, 0, 0, 0], text: this.getText('url'), alignment: 'center', style: 'speaker'}], [{border: [false, false, false, false], margin: [0, 0, 0, 5], text: this.getText('adress'), alignment: 'center', style: 'speaker'}]]}};
        row.push(item);
      }
      content.push(row);
    }
    const def2: any = {
        pageSize: 'A4',
        pageMargins: [10, 10, 10, 10],
        pageOrientation: 'portrait',
        content: [
      {
      style: 'tableExample',
        table: {
          widths: [182, 182, 182],
          body: content,
        },
      },
    ],
    styles: styles,
    };

    content = [];
    for ( let i = 0; i <= 2; i++ ) {
      const row: any = [];
      for (let c = 0; c <= 1; c++) {
        const item: any = {table: {body: [[{border: [false, false, false, false], margin: [0, 5, 0, 0], text: this.eventItem.topic, alignment: 'center', style: 'subheader'}], [{border: [false, false, false, false], margin: [0, 0, 0, 0], style: 'tableExample', alignment: 'right', table: {widths: [22, 100, 22], body: [[{image: stickerIcon, width: 30, margin: [0, 0, 0, 0], alignment: 'center'}, {border: [false, false, false, false], image: qrPng, width: 100, margin: [0, 0, 0, 0], alignment: 'center'}, {image: stickerIcon, width: 30, margin: [0, 0, 0, 0], alignment: 'center'}]]}, layout: {defaultBorder: false}}], [{border: [false, false, false, false], margin: [0, 0, 0, 0], text: this.getText('url'), alignment: 'center', style: 'speaker'}], [{border: [false, false, false, false], margin: [0, 0, 0, 5], text: this.getText('adress'), alignment: 'center', style: 'speaker'}]]}};
        row.push(item);
      }
      content.push(row);
    }
    
    const def3: any = {
        pageSize: 'A4',
        pageMargins: [10, 10, 10, 10],
        pageOrientation: 'portrait',
        content: [
      {
      style: 'tableExample',
        table: {
          widths: [182, 182, 182],
          body: content,
        },
      },
    ],
    styles: styles,
    };
    const typedDefinition: pdfMake.TDocumentDefinitions = def;
    pdfMake.createPdf(typedDefinition).download('sticker.pdf', ((): any => {
      setTimeout( () => { // задержка позволит сохраниться окну загрузки до прогрузки основного контента
        this.loadPdf--;
      }, 2000);
    })());
  }

  private async createPdfList() {
    this.loadPdfList = true;
    const pdf = pdfMake;
    pdf.vfs = pdfFonts.pdfMake.vfs;
    let https = 'https://nopasaran.su/event/old/' + this.id;
    if (this.location !== '') {
      https = 'https://nopasaran.su/event/old/' + this.id + '/' + this.location;
    }
    const qrPng = qr.imageSync(
      https,
      {
        type: 'png',
        color: [178, 34, 34],
        transparent: false,
      },
    );
    const content: any = [];
    content.push(
    [
      {
        border: [false, false, false, false],
        colSpan: 2,
        text: this.$t('event.content'),
        margin: [0, 0, 0, 0],
        style: 'header2',
        alignment: 'center',
      },
      '',
    ]);
    for (const v of Object.keys(this.eventItem.econtent)) {
      this.eventItem.econtent[v].dataUrl = await this.getBase64FromImageUrl(
        '/r/x600/' + this.eventItem.econtent[v].photoAlias);
      if (this.eventItem.econtent.hasOwnProperty(v)) {
        let img: any = {
          border: [false, false, false, false],
          width: 200,
          image: this.eventItem.econtent[v].dataUrl,
          margin: [0, 15, 0, 0],
          alignment: 'center',
        };
        if (this.eventItem.econtent[v].dataUrl === undefined ) {
          img = {
            border: [false, false, false, false],
            text: '',
            margin: [0, 15, 0, 0],
            alignment: 'center',
          };
        }
        content.push([
          {
            border: [false, false, false, false],
            margin: [0, 10, 0, 0],
            style: 'tableExample',
            alignment: 'right',
            table: {
              body: [
                [
                  {
                    margin: [0, 0, 0, 0],
                    text: this.eventItem.econtent[v].topic,
                    alignment: 'right',
                    style: 'header2',
                  },
                ], [
                  {
                    margin: [0, 0, 0, 0],
                    text: this.eventItem.econtent[v].descr,
                    alignment: 'right',
                  },
                ], [
                  {
                    margin: [0, 0, 0, 0],
                    text: this.$t('event.speaker') + ' ' + this.eventItem.econtent[v].speaker,
                    alignment: 'right',
                    style: 'speaker',
                  },
                ],
              ],
            },
            layout: {
              defaultBorder: false,
            },
          },
          img,
        ]);
      }
    }
    const def: any = {
      pageSize: 'A4',
      pageMargins: [10, 10, 10, 10],
      pageOrientation: 'portrait',
      content: [
        {
          style: 'tableExample',
          table: {
            widths: [100, '*'],
            body: [
              [
                {
                  rowSpan: 3,
                  border: [false, false, false, false],
                  image: qrPng,
                  width: 100,
                  margin: [0, 0, 0, 0],
                  alignment: 'center',
                }, {
                  border: [false, false, false, false],
                  margin: [0, 10, 0, 0],
                  text: this.eventItem.topic,
                  alignment: 'right',
                  style: 'subheader',
                },
              ], [
                '',
                {
                  border: [false, false, false, false],
                  margin: [0, 5, 0, 0],
                  text: this.eventItem.descr,
                  alignment: 'right',
                  style: 'header',
                },
              ], [
                '',
                {
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 0],
                  style: 'tableExample',
                  alignment: 'right',
                  table: {
                    widths: [100, 80, '*'],
                    body: [
                      [
                        {
                          margin: [0, 10, 0, 0],
                          text: this.getText('date'),
                          alignment: 'right',
                          style: 'subheader',
                        }, {
                          margin: [0, 10, 0, 0],
                          text: this.getText('time'),
                          alignment: 'right',
                          style: 'subheader',
                        }, {
                          margin: [0, 10, 0, 0],
                          text: this.getText('adress'),
                          alignment: 'right',
                          style: 'subheader',
                        },
                      ],
                    ],
                  },
                  layout: {
                    defaultBorder: false,
                  },
                },
              ],
            ],
          },
        }, {
          style: 'tableExample',
          table: {
            widths: ['*', 200],
            body: content,
          },
        },
      ],
      styles: {
        tableExample: {
          margin: [0, 0, 0, 5],
        },
        tableExample2: {
          margin: [0, 5, 0, 0],
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 0, 0, 0],
        },
        header2: {
          fontSize: 15,
          bold: true,
          alignment: 'right',
          margin: [0, 0, 0, 0],
        },
        speaker: {
          fontSize: 11,
          bold: true,
          alignment: 'right',
          italics: true,
          margin: [0, 0, 0, 0],
          color: '#B22222',
        },
        subheader: {fontSize: 11, color: '#B22222'},
        superMargin: {margin: [20, 0, 40, 0], fontSize: 15},
      },
    };
    const typedDefinition: pdfMake.TDocumentDefinitions = def;
    pdfMake.createPdf(typedDefinition).download('file2.pdf', ((): any => {
      setTimeout( () => { // задержка позволит сщхраниться окну загрузки до прогрузки основного контента
        this.loadPdfList = false;
      }, 2000);
    })());
  }
  private updateUrl(): void {
    bus.$emit('loadWindow', {value: true, info: 'Event.vue:updateUrl://start function'});
    this.active = 'closed';
    this.loadContent++;
    this.issetCircle = false; // Существует кружок или нет
    this.issetURLEvent = false; // Существует событие из URL или нет
    this.activeURLEvent = false; // Активно событие из URL или нет
    this.issetEvent = false; // есть выводимое активное событие в общем
    this.viewOld = false;
    this.form = {};
    this.show = true;
    this.id = 0;
    this.clubLink = '';
    this.location = '';
    this.content = [];
    this.materials = [];
    this.listEventsOld = [];
    this.listEventsNew = [];
    this.nextRout = false;
    this.formData = {
      name: {state: null, default: null, typeResult: 'string', defaultResult: null, nullResult: false},
      email: {state: null, default: null, typeResult: 'string', defaultResult: null, nullResult: false},
    };
    const id: number = Number(this.$route.params.id);
    this.getEvent()
    .then( (orgId) => this.getListEvents(orgId) )
    .then( (data) => {
      const timeNow: any = Math.floor(new Date().valueOf() / 1000); // current unix time
      let eventTime: number = 0; // time event
      const obj: any = {}; // create an object for the event list
      if (data.items.length > 0 && data.items[0].hasOwnProperty('user_id')) {
        this.getOrg( data.items[0].org_id ).then( (dat) => { // get data about the club
          this.clubLink = dat.items[0].url;
        });
        this.issetCircle = true;
        // формируем объект с ключами id записи obj[data.items[i].id] = data.items[i]
        // определяем существует ли по id в ссылке: bool this.issetEvent
        // определяем отображаем событие или нет: bool this.activeURLEvent
        // определяем стоит ли показывать старую запись в случае отсутствия свежих записей: bool this.viewOld
        for (const i in data.items) {
          if (data.items[i].hasOwnProperty('edate') && data.items[i].hasOwnProperty('id')) {
            const t = data.items[i].edate;
            const day = Number(t[8] + t[9]);
            const month = Number( t[5] + t[6] ) - 1;
            const year = t[0] + t[1] + t[2] + t[3];
            const hour = Number(t[11] + t[12]);
            const min = Number(t[14] + t[15]);
            const timeStart = Math.floor(new Date(year, month, day, hour, min, 0).valueOf() / 1000);
            obj[data.items[i].id] = data.items[i];
            obj[data.items[i].id].unix = timeStart;
            const timeEnd = Number(data.items[i].duration) * 60 + timeStart;
            if ( data.items[i].id === Number(id) ) {
              this.issetURLEvent = true;
              eventTime = timeStart;
              this.id = data.items[i].id;
              if (timeStart > timeNow) {
                this.active = 'soon';
              }
              if (timeStart < timeNow && timeNow < timeEnd ) {
                  this.active = 'now';
              }
              if ( timeNow > timeEnd ) {
                  this.active = 'closed';
              }
              if (timeNow < timeEnd) {
                this.activeURLEvent = true; // событие активно
              } else {
                this.viewOld = true; // событие просрочено
              }
              if (this.$route.params.view === 'old') {
                this.activeURLEvent = true;
                this.issetEvent = true;
              }
            }
          }
        }
        if ( !this.activeURLEvent ) { // если запрашиваемое событие в URL не активно
          let max: number = 0;
          for (const i in obj) {
            if (obj.hasOwnProperty(i)) {
              if ( obj[i].unix > max && obj[i].unix > eventTime) {
                this.id = obj[i].id;
                max = obj[i].unix;
                if ( timeNow < obj[i].unix ) {
                  this.viewOld = false;
                  this.nextRout = true;
                }
                this.issetEvent = true;
              }
            }
          }
        }
        if ( this.id !== 0 ) {
          this.createData(obj[this.id]);
        }
        for (const i in obj) {
          if (obj.hasOwnProperty(i)) {
            const end = Number(obj[i].duration) * 60 + obj[i].unix;
            if (obj[i].unix < timeNow && timeNow < end ) {
                continue;
            }
            if ( obj[i].unix < timeNow ) {
              // заполняем массив прошедших событий
              this.listEventsOld.push(obj[i]);
            } else {
              // заполняем массив будущих событий
              this.listEventsNew.push(obj[i]);
            }
          }
        }
        // сортируем списки
        this.listEventsOld.sort((a, b) => (a.unix > b.unix ? 1 : ((b.unix > a.unix) ? - 1 : 0))).reverse();
        this.listEventsNew.sort((a, b) => (a.unix > b.unix ? 1 : ((b.unix > a.unix) ? - 1 : 0))).reverse();
      } else {
        this.issetURLEvent = false;
      }
      this.loadContent--;
      bus.$emit('loadWindow', {value: false, info: 'Event.vue:updateUrl://this.getListEvents().then ... end'});
    });
  }
  private getEvent(): any {
    return new Promise((resolve, reject) => {
      if ( this.$route.params.id === null ) {
        reject(new Error('error'));
      }
      const query: string = '?id=eq.' + this.$route.params.id;
      this.$axios.get(appconfig.ApiRoot + '/api/event_site' + query)
        .then((response) => {
        if (response.status === 200) {
          const items = response.data;
          const org_id = items[0].org_id;
          resolve(org_id);
        }
      }, (err) => {
// tslint:disable-next-line
        console.log(err);
      });
    });
  }

  private getListEvents(orgId): any {
    return new Promise((resolve, reject) => {
      if ( this.$route.params.id === null ) {
        reject(new Error('error'));
      }
      if ( this.$route.params.location !== null && this.$route.params.location !== undefined) {
        this.location = this.$route.params.location;
      }

      const query: string = '?org_id=eq.' + orgId + '&order=edate.desc&limit=30';

      this.$axios.get(appconfig.ApiRoot + '/api/event_site' + query)
        .then((response) => {
        if (response.status === 200) {
          const items = response.data;
          resolve({ items });
        }
      }, (err) => {
// tslint:disable-next-line
        console.log(err);
      });
    });
  }
  private getOrg(id: string): any {
    bus.$emit('loadWindow', {value: true, info: 'Event.vue:getOrg://start function'});
    this.loadContent++;
    return new Promise((resolve, reject) => {
      this.$axios.get(appconfig.ApiRoot + '/api/org?id=eq.' + id)
        .then((response) => {
        if (response.status === 200) {
          const items = response.data;
          bus.$emit('loadWindow', {value: false, info: 'Event.vue:getOrg://resolve'});
          this.loadContent--;
          resolve({ items });
        } else {
          bus.$emit('loadWindow', {value: false, info: 'Event.vue:getOrg:// no data'});
          this.loadContent--;
          resolve({});
        }
      }, (err) => {
// tslint:disable-next-line
        console.log(err);
        bus.$emit('loadWindow', {value: false, info: 'Event.vue:getOrg://error function'});
        this.loadContent--;
      });
    });
  }
  private getBase64FromImageUrl(src: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');
      const img: any = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      const self: any = this;
      img.onload = () => {
          // set size proportional to image
        canvas.height = canvas.width * (img.height / img.width);
        const oc: any = document.createElement('canvas');
        const octx: any = oc.getContext('2d');
        oc.width = img.width * 1;
        oc.height = img.height * 1;
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        // step 2
        octx.drawImage(oc, 0, 0, oc.width * 1, oc.height * 1);
        // step 3, resize to final size
        ctx.drawImage(oc, 0, 0, oc.width * 1, oc.height * 1, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
        self.loadContent--;
        // bus.$emit('loadWindow', {value: false, info: 'Event.vue:getBase64FromImageUrl://img.onload'});

      };
      img.onerror = () => {
        self.loadContent--;
       // bus.$emit('loadWindow', {value: false, info: 'Event.vue:getBase64FromImageUrl://img.onerror'});
      };
      img.src = src;
      this.loadContent++;
      // bus.$emit('loadWindow', {value: true, info: 'Event.vue:getBase64FromImageUrl://end function'});
    });
  }

  private async createData(data: any) {
    this.eventItem = data;
    if (this.eventItem.tplparam !== undefined ) {
      if( this.eventItem.tplparam.event !== undefined && this.eventItem.tplparam.event.topBackground !== undefined ) {
        this.theme.topBackground = this.eventItem.tplparam.event.topBackground;
      }
      const url = ((this.location === '') ? '../../theme/' : '../../../theme/');
      bus.$emit('loadWindow', {value: true, info: 'Event.vue:getBase64FromImageUrl://end function'});
      const img: any = new Image();
      img.onload = () => {
        bus.$emit('loadWindow', {value: false, info: 'Event.vue:getBase64FromImageUrl://end function'});
      }
      img.src = url + this.theme.topBackground;
    }
    for ( const i in this.eventItem.ematerials ) { // отображаем материалы
      if (this.eventItem.ematerials.hasOwnProperty(i)) {
        this.materials.push(i);
      }
    }

    // контент формируются после загрузки всех изображений
  }
  private getText(name: string, data: any = null): string {
    let t = data;
    let c = [];
    if ( name === 'date' || name === 'time') {
      if ( t === null ) {
        t = this.eventItem.edate;
      }
      c = t.split(' ');
    }
    if (name === 'date') {
      if (c.length > 1) { return c[0]; }
      const day = Number(t[8] + t[9]);
      const month = Number( t[5] + t[6] );
      const year = t[0] + t[1] + t[2] + t[3];
      return ((day < 10) ? '0' : '') + day + '.' + ((month < 10) ? '0' : '') + month + '.' + year;
    }
    if (name === 'time') {
      if (c.length > 1) { return c[1]; }
      const hour = Number(t[11] + t[12]);
      const min = Number(t[14] + t[15]);
      return  hour + ':' + min;
    }
    if (name === 'url') {
      if (this.location !== '') {
        return 'nopasaran.su/event/new/' + this.id + '/' + this.location;
      } else {
        return 'nopasaran.su/event/new/' + this.id;
      }
    }
    if ( this.eventItem[name] !== undefined ) {
      return this.eventItem[name];
    }
    return '';
  }
  private changeField(field: string): void {
    this.formData[field].state = null;
  }
  private onSubmit(evt: any): void {
    evt.preventDefault();
// tslint:disable-next-line:max-line-length
// проводим контроль поступающих данных и приводим в удобоваримый вид. В случае ошибки выводим сообщение и вносим записи с изменениями в объект
// tslint:disable-next-line:max-line-length
    if ( this.controlData() ) { // проверяем на заполненность полей в форме и подгатавливаем данные для отправки на сервер
      this.saveChange().then( (data) => {
        if (data) { // если дубликат не найден
          this.onReset();
          this.modal.title = this.$t('modal.success');
          this.modal.text = this.$t('modal.text2');
          this.myModal = true;
        }
      }).catch( (err) => {
// tslint:disable-next-line
        console.log(err);
      });
    } else {
      bus.$emit('addMember', false);
    }
  }

  private controlData(): boolean {
// tslint:disable-next-line:max-line-length
// проводим проверку на незаполненные поля, в случае отсутствия данных выводим сообщение; перечисляем обязательные поля к заполнению
    let err: boolean = false;
    for (const v in this.form) {
      if (this.form.hasOwnProperty(v)) {
        if ( this.formData[v].nullReault ) {
          if ( this.form[v] === this.formData[v].default ) {
            this.form[v] = this.formData[v].defaultResult;
          }
          if ( typeof this.form[v] !== this.formData[v].typeResult ) {
            /* this.form[v] = this.convertType(v); */
          }
          this.formData[v].state = true;
        } else {
          if ( this.form[v] === this.formData[v].default  && !this.formData[v].nullResult ) {
            err = true;
            this.formData[v].state = false;
            continue;
          } else if ( typeof this.form[v] !== this.formData[v].typeResult ) {
            /* this.form[v] = this.convertType(v); */
            this.formData[v].state = true;
            continue;
          }
          this.formData[v].state = true;
        }
      }
    }
    if (err) {
      this.modal.title = this.$t('modal.attension');
      this.modal.text = this.$t('modal.text4');
      this.myModal = true; // 1
      return false;
    }
    return true;
  }
  private saveChange(): any {
    return new Promise( (resolve, reject) => {
      this.$axios.post(appconfig.ApiRoot + '/api/rpc/event_reg_form',
      // tslint:disable-next-line
      { 'f': {'event_id': this.id, 'email': this.form.email, 'name': this.form.name,},
      }).then((response) => {
        if (response.status === 200) {
          resolve(true);
        }
        resolve(false);
      });
    }).catch((error) => {
// tslint:disable-next-line
console.log(error)
    });
  }
  private onReset(): void {
    for (const v of Object.keys(this.formData)) {
      if (this.formData.hasOwnProperty(v)) {
        this.form[v] = this.formData[v].default;
        this.formData[v].state = null;
      }
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }
}
</script>


<style rel="stylesheet" lang="scss">
.fileDownloadIcon{
  display: block;
  position: absolute;
  bottom: 40px;right: 50px;
  height: 50px;
  width: 50px;
  cursor: pointer;
}
.fileDownload{
  display: block;
  position: absolute;
  bottom: 35px;right: 50px;
  height: 65px;
  width: 65px;
  background: #ffffff url(https://nopasaran.su/theme/green-spin.svg) center center no-repeat;background-size:65px;}
#top-block{
	.free{
			span{
				color:#fff;
				text-transform: uppercase;
			}
	}
	.title{
		color:#fff;
		font-size:46px;
	}
	.card{
		legend{
			text-align: center;
		}
	}
	
}
.text2{
	font-size:18px;

}
.trangle {
    position: relative;

 }
.trangle::after {
    content: ''; 
    position: absolute; /* Абсолютное позиционирование */
    left: 0px; bottom: -80px; /* Положение треугольника */
    border: 40px solid transparent;	border-top: 40px solid #3b526b; border-left: 40px solid #3b526b;
  }
.trangleText {
	font-size:2em;
	position:absolute;
	left: 30px; top: 0px;
	color:white;
}
.circle {
    width: 50px; /* задаете свои размеры */
	height: 50px;
	top:5px;
	left:20px;
	display: flex;
    justify-content: center;
    align-items: center;
	color:#ffef00;
	border: 2px solid #ffef00;
    border-radius: 50%;
    /* не забываем о кроссбраузерности */
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    -khtml-border-radius: 50%;
	span{
		font-size:28px
	}
}
.circle-img {
    width: 100px; /* задаете свои размеры */
    height: 100px;
    overflow: hidden;
    background: #fff;
    padding: 5px; /* создание отступов */
    border-radius: 50%;
    /* не забываем о кроссбраузерности */
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border: #aaa 1px solid;
    box-shadow: 0px 1px 1px 1px #bbb; /* тень */
    -moz-box-shadow: 0px 1px 1px 1px #bbb;
    -webkit-box-shadow: 0px 1px 1px 1px #bbb;
	img {
    display: block;
    width:100%;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
	}
}

</style>