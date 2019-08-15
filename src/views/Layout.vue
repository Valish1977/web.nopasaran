<template>
	<div>

<!-- Navbar START -->
<header style="background-color:#3b526b">
<b-navbar toggleable="md" class="navbar navbar-default navbar-custom" v-bind:class="{'fixed-top': fixed}"  type="dark" style="background-color:#3b526b">
	<div class="container">
  <b-navbar-brand  href="#">No Pasaran</b-navbar-brand>
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
			<b-nav-item href="#" @click="setRoute('/clubs')">{{$t('menu.clubs')}}</b-nav-item>
			<b-nav-item href="#" @click="setRoute('/events/0')">{{$t('menu.events')}}</b-nav-item>
    </b-navbar-nav>
		<b-navbar-nav style="margin:0">
			<b-nav-item-dropdown :text="language" left>
				<b-dropdown-item @click="toggleLang('ru')">{{$t('menu.ru')}}</b-dropdown-item>
    		<b-dropdown-item @click="toggleLang('en')">{{$t('menu.en')}}</b-dropdown-item>
    		<b-dropdown-item @click="toggleLang('it')">{{$t('menu.it')}}</b-dropdown-item>
			</b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
	</div>
</b-navbar>	


</header>
<!-- Navbar END -->
<router-view></router-view>

<!-- Footer START -->
<footer>
	<div class="footer" style="padding-left:30px">
		<div class="container">
			<div class="row">
				<!-- Col 1 Start -->
				<div class="col-xs-12">
					<div class="footer-column-1">
						<div class="text-content mt-25">
							<div class="white-color mt-20">								
								<p><i class="fa fa-envelope-o"></i> E-mail: nopasaran@gmail.com</p>	
							</div>
						</div>						
					</div>
				</div>
			
			</div>
		</div>		
	</div>
	<div class="bottom-bar">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-sm-6 col-xs-12">
					<div class="bottom-icons white-color">
						<a href="#"><i class="fa fa-facebook"></i></a>
						<a href="#"><i class="fa fa-twitter"></i></a>
						<a href="#"><i class="fa fa-instagram"></i></a>
						<a href="#"><i class="fa fa-pinterest"></i></a>									
					</div>		
				</div>
				<div class="col-md-6 col-sm-6 col-xs-12">
					<div class="grey-color right-holder mt-10">
						<p>© Copyright 2018 NoPasaran.su. All Rights reserved</p>
					</div>
				</div>				
			</div>
		</div>
	</div>
</footer>
<!-- Footer END -->


<!-- Scroll to top button Start -->
<go-top-button  :animate="true" :speed="50" :acceleration="2" :scrollDistance="300" :classNames="'go-top-button-class'"><i class="fa fa-angle-up"></i></go-top-button>


  </div>
</template>

<!-- built files will be auto injected -->

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import bus from '@/bus';

import GoTopButton from 'vue-go-top-button';
import 'vue-go-top-button/dist/lib/vue-go-top-button.min.css';


@Component({ components: {
    GoTopButton,
  },
})

export default class Layout extends Vue {
  public fixed: any = null;
  private language: string;
  constructor() {
    super();
    const runScroll = this.runScroll;
    const lang: any = localStorage.getItem('language');
    if (lang === 'ru') { this.language = 'Русский'; }
    if (lang === 'en') { this.language = 'English'; }
    if (lang === 'it') { this.language = 'Italiano'; }
    window.onscroll = () => {
      runScroll();
    };
  }
  private setRoute(paths: string): void {
    this.$router.push({ path: paths });
  }
  private toggleLang(lang: string): void {
    this.$i18n.locale = lang;
    this.$store.dispatch('setLanguage', lang);
    localStorage.setItem('language', lang);
    if (lang === 'ru') { this.language = 'Русский'; }
    if (lang === 'en') { this.language = 'English'; }
    if (lang === 'it') { this.language = 'Italiano'; }
    bus.$emit('toggleLang', false);
  }
  private runScroll(): void {
    let scrolled: number;
    const st: any = document.documentElement;
    if ( !st.scrollTop ) {
      scrolled = window.pageYOffset || st.scrollTop;
    } else {
      scrolled = window.pageYOffset;
    }
    if (scrolled > 20) {
      this.setStyle(true);
    } else {
      this.setStyle(false);
    }
  }
  private setStyle(obj: any): void {
    this.fixed = obj;
  }

}
</script>

<style rel="stylesheet" lang="scss">
$grid-gutter-width: 30px !default;
#dropdownLang{
	button{
		color:#fff;
	}
	
}
	#nav_collapse{
		.navbar-nav{
			margin:0 auto;
		}
		.navbar-nav>li {
	      padding: 6px;
			a{color:#fff;}
			a:hover{color:#28a745; text-decoration:none}
		}
		.dropdown-menu.dropdown-menu-left.show{
			border:0;
			a{color:#3b3b3b; text-decoration:none}
			a:hover{
				color:#28a745;
			}
		}
	}

.go-top-button-class{
	font-size: 20px;  
	padding: 6px; 
	text-align:center; 
	color: #fff;
	text-decoration: none;
	position:fixed;
	bottom:80px;
	right:20px;
	border-radius: 5px;
	background: #3b526b;
	width: 40px;
	height: 40px;  
	z-index: 9999;
	outline: none;
	-webkit-transition: all 0.3s ease;
	-moz-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;   
}
.go-top-button-class i{
	color: #fff;
}

.go-top-button-class:hover{
	color: #fff;
	background: #18ba60 ;
}
 .go-top-button-class:hover i{
	color: #fff;
}
.go-top-button-class:visited{
	color: #fff;
	text-decoration:none;
}




</style>
