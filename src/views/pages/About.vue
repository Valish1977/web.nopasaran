<template>
<div>
	
	<div class="page-title-section" style="background-image: url(../theme/bg.jpg);">
		<div class="container">
			<div class="page-title center-holder">
				<h1>{{$t(this.$route.meta.pageName+'.title')}}</h1>
<!-- 	            <ul>
					<li><router-link to="/events/0">{{$t('index.title')}}</router-link></li>
	                <li><router-link :to="this.$route.path">{{$t(this.$route.meta.pageName+'.title')}}</router-link></li>
				</ul> -->
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

@Component({})
export default class About extends Vue {
  private modal: any = {title: '', text: ''};
  constructor() {
    super();
  }
  private getListEvents(): any {
      return new Promise((resolve, reject) => {
        const arr: any = {};
        if ( this.$route.params.id === null ) {
          reject(new Error('error'));
        }
        arr.id = this.$route.params.id;
        this.$axios.post(appconfig.ApiRoot + '/getListEvents',
            {
              method: 'Event',
              params: arr,
            },
            {headers: {}},
          )
          .then((response) => {
              if (response.status === 200) {
                const items = response.data.event;
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
