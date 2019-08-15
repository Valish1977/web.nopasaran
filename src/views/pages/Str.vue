<template>
<div>
	<!-- Page Title Section START -->
	<div class="page-title-section" style="background-image: url(../theme/parallax-2.jpg);">
		<div class="container">
			<div class="page-title center-holder">
				<h1>{{$t(this.$route.meta.pageName+'.title')}}</h1>
<!-- 	            <ul>
					<li v-for="(item, index) in this.$route.meta.breadcrumbs" :key="`1_`+index"><router-link :to="item.path"><a href="/index">{{$t(item.title)}}</a></router-link></li>
	                <li><router-link :to="this.$route.path"><a :href="this.$route.path">{{$t(this.$route.meta.pageName+'.title')}}</a></router-link></li>
				</ul> -->
			</div>
		</div>
	</div>

	<div class="container" style="margin-top: 100px; margin-bottom: 100px;">
		<div class="row">
		<!-- Left Side START -->
			<div class="col-md-8 col-sm-8 col-xs-12">
                <div class="block-heading left-holder">
					<h3>{{$t(this.$route.meta.pageName+'.title')}}</h3>
				</div>
                <span v-html="$t(this.$route.meta.pageName+'.html')"></span>
				<div class="blog-post-share">
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-6 left-holder">						
						</div>
						<div class="col-md-6 col-sm-6 col-xs-6 share-icons right-holder">
							<a href="#"><i class="fa fa-facebook"></i></a>
							<a href="#"><i class="fa fa-twitter"></i></a>
							<a href="#"><i class="fa fa-instagram"></i></a>
							<a href="#"><i class="fa fa-pinterest"></i></a>							
						</div>						
					</div>
				</div>
            </div>
		  <div class="col-md-4 col-sm-4 col-xs-12">
			<div class="blog-post-left" v-if="str.length > 1">
				<h4>{{$t('strPage.other-materials')}}</h4>
				<div class="recent-posts">
					<div class="row">
						<div class="col-12 recent-posts-text">
							<p v-for="(item, index) in this.str" :key="index"><a href="#"><router-link :to="item.path">{{item.name}}</router-link></a></p>
						</div>
					</div>
				</div>
			</div>

			<div class="blog-post-left categories"  v-if="list.length > 0">
				<h4>{{$t('strPage.categories')}}</h4>
				<ul>
					<li v-for="(item, index) in this.list" :key="index"><a href="#"><router-link :to="item.path">{{item.name}}<span v-if="item.count > 0"> ({{item.count}})</span></router-link></a></li>	
				</ul>
			</div>
		  </div>
		</div>
      </div>
	<!-- Partners Section START -->
	<div class="partner-section-grey">
		<div class="container">			     	
		</div>
	</div>
	<!-- Partners Section END -->

  </div>
</div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import bus from '@/bus';

@Component
export default class Str extends Vue {
  private list: any = [];
  private str: any = [];
  constructor() {
    super();
  }
  @Watch('$route.path')
  protected routerWatch(): void {  // изменению внешнего props навешиваем реакцию на сброс полей
    this.getStr();
  }
  private created(): void {
    bus.$on('toggleLang', this.getStr);
    this.getStr();
  }
  private getStr(): any {
    const vr: any = this.$t('str');
    let counts: number = 0;
    let parent: string = '';
    const path: string = this.$route.path.substring(1);
    if (this.$route.meta.breadcrumbs[1] !== undefined) {
      parent = this.$route.meta.breadcrumbs[1].path.substring(1);
    }

    this.str = [];
    this.list = [];

    for ( const v of Object.keys(vr) ) {
      counts = 0;
      if ( parent === v || path === v ) {
        this.str.push({path: '/' + v, name: vr[v].title.toLowerCase()} );
      }
      for ( const i in vr[v] ) {
        if ( i !== 'title' && i !== 'html') {
          counts++;
          if ( parent === v || path === v ) {
            this.str.push({path: '/' + v + '/' + i, name: vr[v][i].title.toLowerCase()} );
          }
        }
      }
      this.list.push({path: '/' + v, name: vr[v].title.toLowerCase(), count: counts});
    }
  }
  private destroyed(): void {
    bus.$off('toggleLang', this.getStr);
  }
}
</script>