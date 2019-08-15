import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCreditCard, faFileDownload, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCreditCard);
library.add(faFileDownload);
library.add(faEyeSlash);

Vue.component("font-awesome-icon", FontAwesomeIcon);
