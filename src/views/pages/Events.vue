<template>
<div>
	
	<div class="page-title-section" style="background-image: url(../theme/bg.jpg);">
		<div class="container">
			<div class="page-title center-holder">
				<h1>{{$t(this.$route.meta.pageName+'.title')}}</h1>
<!-- 	            <ul>
					<li><router-link to="/index">{{$t('index.title')}}</router-link></li>
	                <li><router-link to="/events/0">{{$t(this.$route.meta.pageName+'.title')}}</router-link></li>
				</ul> -->
			</div>
		</div>
	</div>
    <div class="section-block">
    	<div class="container">
            <form method="post" class="primary-form" v-if="$route.params.id === '0' || $route.params.id === undefined">
                <div class="row">
                    <div class="col-xs-12 col-sm-6">
				    	<b-form-select v-model="selectedCity" :options="optionsCity" class="mb-3" />
				    </div>	
                    <div class="col-xs-12 col-sm-6">
				    	<b-form-select v-model="selectedClub" :options="optionsClub" class="mb-3" />
				    </div>
                </div>						
            </form>	
            <div v-if="eventList.length > 0"  class="section-heading center-holder" style="margin-top:30px; margin-bottom:30px">
			    <h2>{{$t('events.eventsAllTitle')}}</h2>
                <p  v-if="selectedClub !== null && nameClub !== '' " >{{$t('events.eventsClubText')}} {{nameClub}}</p>
		    </div>
            <div class="row" v-if="eventList.length > 0">
				<div class="col-12">
					<ol>
						<li  v-for="(val, i) in eventList" :key="i" style="margin-top:20px;">
              <span v-if="selectedCity === null"> {{eventList[i].geo_name}} - </span>
              <span v-if="selectedClub === null"> {{eventList[i].user_name}} </span>
              <span style="font-size:0.8em"> ( {{eventList[i].edate_view}} ): </span> 
              <router-link v-if="eventList[i].active" :to="'/event/new/'+eventList[i].id"><span style="word-wrap:break-word">{{eventList[i].descr}}</span></router-link> 
              <router-link v-if="!eventList[i].active" :to="'/event/old/'+eventList[i].id"><span style="word-wrap:break-word">{{eventList[i].descr}}</span></router-link> 
              <span v-if="eventList[i].active == 'closed'" style="color:red; font-size:0.9em"> ( {{$t('events.closed')}} )</span>
              <span v-if="eventList[i].active == 'soon'" style="color:green; font-size:0.9em"> ( {{$t('events.soon')}} )</span>
              <span v-if="eventList[i].active == 'now'" style="color:green; font-size:0.9em"> ( {{$t('events.now')}} )</span>
          </li>
					</ol>
				</div>
			</div>
    	</div>
    </div>
<!-- Service Boxes END -->
<!-- Services START -->
<div class="section-block-grey">
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
						<span><font-awesome-icon icon="file-download" style="width:40px; font-size:40px; color:#18ba60" /></span>									
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
						<span><font-awesome-icon icon="file-download" style="width:40px; font-size:40px; color:#18ba60" /></span>									
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
						<span><font-awesome-icon icon="credit-card" style="width:40px; font-size:40px; color:#18ba60" /></span>									
					</div>
				</div>
			</div>													
		</div>
	</div>
</div>
<!-- Services END -->
  <b-modal ref="myModalRef" :title="modal.title" ok-only hide-footer>
    <p style="color:red">
		{{modal.text}}
    </p>
  </b-modal>
</div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import appconfig from '@/appconfig';

@Component
export default class Events extends Vue {
  private modal: any = {title: '', text: ''};
  private selectedCity: any = null;
  private selectedClub: any = null;
  private optionsCity: any = [];
  private optionsClub: any = [];
  private eventList: any = [];
  private clubs: any = {};
  private cityMap: any = {};
  private nameClub: string = '';
  constructor() {
      super();
  }
  @Watch('$route')
  private watchViewOld(to, from): void { // отрабатывает при смене роута
        if (Number(this.$route.params.id) === 0 || this.$route.params.id === undefined) {
            this.selectedClub = null;
        } else {
            this.selectedClub = this.$route.params.id;
        }
        this.getClubEvents().then( (data) => {
            this.createListEvents(data.items);
        });
  }
  @Watch('selectedCity')
  private watchSelectedCity(): void { // отрабатывает при смене роута
    this.getListClubs().then( (data) => {
        this.createOptionsClub(data.items);
    });
  }
  @Watch('selectedClub')
  private watchSelectedClub(): void { // отрабатывает при смене роута
    this.getClubEvents().then( (data) => {
      this.createListEvents(data.items);
    });
  }
  private created(): void {
        this.cityMap = {};
        this.optionsCity.push({ value: null, text: this.$t('clubs.selectCityNull') });
        this.optionsClub.push({ value: null, text: this.$t('clubs.selectClubNull') });
        const m = localStorage.getItem('ref_geo');
        let items = {};
        if (m) {
            items = JSON.parse(m);
        }
        for (const key in items) {
            if (items.hasOwnProperty(key)) {
              const lang = this.$i18n.locale;
              this.optionsCity.push({ value: items[key].id, text: items[key].tr[lang] });
              this.cityMap[items[key].id] = items[key].tr[lang];
            }
        }
        if (Number(this.$route.params.id) === 0 || this.$route.params.id === undefined) {
            this.selectedClub = null;
        } else {
            this.selectedClub = this.$route.params.id;
        }
        this.getClubEvents().then((data) => {
            this.createListEvents(data.items);
        });
  }
  private createOptionsClub(items: any): void {
        this.selectedClub = null;
        this.optionsClub = [];
        this.optionsClub.push({ value: null, text: this.$t('clubs.selectClubNull') });
        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                this.optionsClub.push({ value: items[key].id, text: items[key].name });
            }
        }
  }
  private createListEvents(data: any): void {
    const timeNow: any = Math.floor(new Date().valueOf() / 1000);
    this.eventList = [];
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        data[i].active = true;
        const t = data[i].edate;
        const day = Number(t[8] + t[9]);
        const month = Number( t[5] + t[6] ) - 1;
        const year = t[0] + t[1] + t[2] + t[3];
        const hour = Number(t[11] + t[12]);
        const min = Number(t[14] + t[15]);
        // tslint:disable-next-line
        data[i].edate_view = ((day < 10) ? '0' : '') + day + '.' + ((month < 10) ? '0' : '') + month + '.' + year + ' ' + hour + ':' + min;
        const timeStart = Math.floor(new Date(year, month, day, hour, min, 0).valueOf() / 1000);
        const timeEnd = Number(data[i].duration) * 60 + timeStart;
        if (timeStart > timeNow) {
            data[i].active = 'soon';
        }
        if (timeStart < timeNow && timeNow < timeEnd ) {
            data[i].active = 'now';
        }
        if ( timeNow > timeEnd ) {
            data[i].active = 'closed';
        }
        this.eventList.push(data[i]);
        this.nameClub = data[i].user_name;
      }
    }
    if (this.eventList.length > 0) {
      this.eventList.reverse();
    }
  }
  private getListClubs(): any {
      return new Promise((resolve, reject) => {
        let query: string = '';
        if ( this.selectedCity !== null ) {
            query = '?id=neq.1&geo_id=eq.' + this.selectedCity;
        }
        this.$axios.get(appconfig.ApiRoot + '/api/org' + query)
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
  private getClubEvents(): any {
      return new Promise((resolve, reject) => {
        let query: string = '';
        if ( this.selectedClub !== null ) {
            query = '?org_id=eq.' + this.selectedClub;
        }
        if ( this.selectedCity !== null ) {
            query += (query === '') ? '?' : '&';
            query += 'geo_id=eq.' + this.selectedCity;
        }
        query += (query === '') ? '?' : '&';
        query += 'limit=30&order=edate.desc';
        this.$axios.get(appconfig.ApiRoot + '/api/event_site' + query)
          .then((response) => {
          if (response.status === 200) {
          const items = response.data.reverse();
            resolve({ items });
          }
        }, (err) => {
// tslint:disable-next-line
          console.log(err);
        },
      );
    });
  }
}
</script>