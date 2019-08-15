<template>
<div>
	
	<div class="page-title-section" style="background-image: url(../theme/bg.jpg);">
		<div class="container">
			<div class="page-title center-holder">
				<h1>{{$t(this.$route.meta.pageName+'.title')}}</h1>
<!-- 	            <ul>
					<li><router-link to="events/0">{{$t('event.getEvents')}}</router-link></li>
	        <li><router-link :to="this.$route.path">{{$t(this.$route.meta.pageName+'.title')}}</router-link></li>
				</ul> -->
			</div>
		</div>
	</div>
    <div class="section-block">
    	<div class="container">
            <form method="post" class="primary-form">
                <div class="col-xs-12">
					<b-form-select v-model="selected" :options="optionsCity" class="mb-3" />
				</div>							
            </form>	
            <div class="row" :visible="clubs.length > 0">
				<div class="col-12" v-for="(value, index) in clubs" :key="index">
					<h4 v-if="selected === null" class="title"><span>{{cityMap[index]}}</span></h4>
					<ol>
						<li style="margin-top:20px"  v-for="(val, i) in clubs[index]" :key="i">
              <router-link :to="'/events/'+clubs[index][i].id">{{clubs[index][i].name}}</router-link>
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
export default class Clubs extends Vue {
  private modal: any = {title: '', text: ''};
  private selected: any = null;
  private optionsCity: any = [];
  private geoList: any = [];
  private clubs: any = {};
  private cityMap: any = {};
  constructor() {
    super();
  }
  @Watch('selected')
  private watchSelected(): void { // отрабатывает при смене роута
    this.getListClubs().then( (data) => {
      if (data.items !== undefined && data.items.length > 0) {
        this.createList(data.items);
      }
    });
  }
  private created(): void {
    this.cityMap = {};
    this.optionsCity.push({ value: null, text: this.$t('clubs.selectCityNull') });
    const m = localStorage.getItem('ref_geo');
    let items = {};
    if (m) {
      items = JSON.parse(m);
    }
    for (const key in items) {
      if (items.hasOwnProperty(key)) {
        const nameTr = items[key].tr;
        const lang = this.$i18n.locale;
        this.geoList[items[key].id] = {};
        this.geoList[items[key].id].name = nameTr[lang];
        this.optionsCity.push({ value: items[key].id, text: nameTr[lang] });
        this.cityMap[items[key].id] = nameTr[lang];
      }
    }
    this.getListClubs().then( (data) => {
      if (data.items !== undefined && data.items.length > 0) {
        this.createList(data.items);
      }
    });
  }
  private createList(data: any): void {
    this.clubs = {};
    for (const i in data) {
      if (data.hasOwnProperty(i)) {
        if ( this.clubs[data[i].geo_id] === undefined ) {
          this.clubs[data[i].geo_id] = [];
        }
        this.clubs[data[i].geo_id].push({id: data[i].id, name: data[i].name});
      }
    }
  }
  private getListClubs(): any {
    return new Promise((resolve, reject) => {
    let query: string = '';
    if ( this.selected === null ) {
      query = '';
    } else {
      query = '&geo_id=eq.' + this.selected;
    }
    this.$axios.get(appconfig.ApiRoot + '/api/org?id=neq.1' + query)
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
}
</script>