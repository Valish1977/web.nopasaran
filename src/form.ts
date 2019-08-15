// tslint:disable:max-line-length no-empty forin
import bus from '@/bus';
import { Vue, Watch } from 'vue-property-decorator';

export default class Form extends Vue {
    protected itemCard: boolean = false; // наличие входных данных карты/записи
    protected lockСhanges: boolean = false; // блокировка изменений (обычно навешивается на загрузку)
    protected dialogOpen: boolean = false; // свойство открытое/закрытое диалоговое окно
    protected dialogClose: boolean = false; // свойство для закрытия диалогового окна после сброса всех полей
    protected resetForm: boolean = false; // принудительный сброс формы
    protected validateForm: boolean = false; // принудительная валидация
    protected validateFormSearch: boolean = false; // принудительная валидация поиска
    protected countField: number = 0; // для проверки загрузки и сброса кол-ва полей
    protected sendData: any = {}; // для дальнейшего отслеживания data - явно определяем переменную
    protected sendSearchData: any = {}; // для дальнейшего отслеживания data - явно определяем переменную
    protected defaultData: any = {}; // сохраняется в данный объект начальные значения editField (для reset-а)
    protected defaultSearchData: any = {}; // сохраняется в данный объект начальные значения searchField (для reset-а)
    protected searchField: any = {};
    protected editField: any = {};
    constructor() {
      super();
    }

    protected created(): void {
      bus.$on('createFields', this.createFieldsFn('')); // при загрузке компонентов, отрабатываеться метод
      bus.$on('resetFields', this.resetFieldsFn('')); // при сбросе компонентов, отрабатываеться метод
    }

    @Watch('validateForm')
    protected validateFormWatch(): void {
      this.validateFormFn();
    }

    @Watch('resetForm')
    protected resetFormWatch(): void {
      for ( const v in this.editField ) {
        if (this.dialogClose) {
          this.editField[v] = Object.assign({}, this.defaultData[v]);
        }
        this.editField[v].serviceProperty.reset = !this.editField[v].serviceProperty.reset;
      }
      for ( const v in this.searchField) {
        if (this.dialogClose ) {
          this.searchField[v] = Object.assign({}, this.defaultSearchData[v]);
        }
        this.searchField[v].serviceProperty.reset = !this.searchField[v].serviceProperty.reset;
      }
    }

    @Watch('resetChanges')
    protected resetChangesWatch(): void {  // изменению внешнего props навешиваем реакцию на сброс полей
      this.resetForm = ! this.resetForm;
    }

    @Watch('resetChanges')
    protected dialogOpenWatch(): void {
      if ( this.dialogOpen ) {
        this.dialogClose = false;
      }
    }

    @Watch('dialogClose')
    protected dialogCloseWatch(): void { // команда на закрытие окна со сбросом формы
      // на dialogClose == false реакция отменяеться, т.к. значение false назначиться после отработки сброса полей
      if ( this.dialogClose ) {
        this.resetForm = !this.resetForm; // выставляются заданные значения или значения по умолчанию
        this.countField = 0;
      }
    }

    @Watch('dialogCloseNotDefault')
    protected dialogCloseNotDefaultWatch(): void { // команда на закрытие окна без сброса формы
      // на dialogClose == false реакция отменяеться, т.к. значение false назначиться во время закрытия окна
      if ( this.dialogClose ) {
        this.countField = 0;
        this.dialogClose = false;  // сбрасывем значение после отработки сброса полей
        this.dialogOpen = false; // выставляются заданные значения или значения по умолчанию
      }
    }

    protected resetFieldsFn( field: string ): any { // функция для вычисления reset-иных компонентов.
      if (( this.editField[field] !== undefined || this.searchField[field] !== undefined )  && this.dialogOpen) {
        this.countField ++;
        if ( this.dialogClose && this.editField[field] !== undefined ) { this.sendData[field] = { name: field, data: undefined };  }
        if ( this.dialogClose && this.searchField[field] !== undefined ) { this.sendSearchData[field] = { name: field, data: undefined }; }
        this.resetFieldFnData( field ); // задаем полям значения после сброса всех компонентов
        if (this.countField === ( Object.keys(this.editField).length + Object.keys( this.searchField ).length )) { // учитываем что массив начинается с нуля
          this.resetFieldsFnData({}); // задаем полям значения после сброса всех компонентов
          this.countField = 0;
          this.lockСhanges = false;
          if ( this.dialogClose ) { // если есть команда на закрытие окна
            this.dialogClose = false; // сбрасывем значение после отработки сброса полей
            this.dialogOpen = false;
          }
        }
      }
    }

    protected createFieldsFn( field: string ): any { // функция вызывается при загрузке дочерних компонентов
      if ( (this.editField[field] !== undefined || this.searchField[field] !== undefined ) && this.dialogOpen ) {
        this.countField ++;
        if (this.editField[field] !== undefined) {
          this.sendData[field] = { name: field, data: undefined };
          this.defaultData[field] = Object.assign( {}, this.editField[field] );
        }
        if (this.searchField[field] !== undefined) {
          this.sendSearchData[field] = { name: field, data: undefined };
          this.defaultSearchData[field] = Object.assign( {}, this.searchField[field] );
        }
        this.createFieldFnData( field ); // метод выполняется после загрузки компонента
        if (this.countField === ( Object.keys(this.editField).length + Object.keys(this.searchField).length )) {  // учитываем что массив начинается с нуля
          this.countField = 0;
          this.createFieldsFnData({}); // задаем полям значения после загрузки всех компонентов
          this.resetForm = !this.resetForm; // выставляются заданные значения или значения по умолчанию
          this.lockСhanges = true;
        }
      }
    }

    protected getDataFieldFn(e: any): void { // получаем значение компонентов полей
      if ( this.editField[e.name] !== undefined) {
        this.sendData[e.name] = e;
        this.getDataFieldFnData(e);
      }
      if ( this.searchField[e.name] !== undefined ) {
        this.sendSearchData[e.name] = e;
        this.getSearchDataFieldFnData(e);
      }
    }

    protected validateFormFn(): void {
      for ( const v in this.editField ) {
        this.editField[v].serviceProperty.validate = !this.editField[v].serviceProperty.validate;
      }
      for ( const v in this.searchField ) {
        this.searchField[v].serviceProperty.validate = !this.searchField[v].serviceProperty.validate;
      }
    }

    protected getDataFieldFnData(e: any): void {} /* в функцию закидываем все что необходимо выполнить после получения с поля данных */
    protected getSearchDataFieldFnData(e: any): void {} // в функцию закидываем все что необходимо выполнить после получения с полей поиска данных
    protected createFieldFnData(field: string): void {} // в метод закидываем все что необходимо выполнить после загрузки компонента (поля)
    protected createFieldsFnData(e: any): void {} // в функцию закидываем все что необходимо выполнить после загрузки всех компонентов (полей)
    protected resetFieldFnData(field: string): void {} // в функцию закидываем все что необходимо выполнить после reset полей данных
    protected resetFieldsFnData(e: any): void {} // в функцию закидываем все что необходимо выполнить после reset полей данных
    protected controlDate(date: string): string {
      // eslint-disable-next-line
      const regex = /^\d\d.\d\d.\d\d\d\d$/i;
      // eslint-disable-next-line
      const regex2 = /^\d\d.\d\d.\d\d\d\d\s\-\s\d\d.\d\d.\d\d\d\d$/i;

      if ( regex.test(date)) {
         return `${date.substr(6, 4)}-${date.substr(3, 2)}-${date.substr(0, 2)}`;
      }
      if ( regex2.test(date)) {
        // tslint:disable-next-line:max-line-length
        return `${date.substr(6, 4)}-${date.substr(3, 2)}-${date.substr(0, 2)} - ${date.substr(19, 4)}-${date.substr(16, 2)}-${date.substr(13, 2)}`;
      }
      return date;
    }

    protected destroyed(): any {
      bus.$off('resetFields', this.resetFieldsFn(''));
      bus.$off('createFields', this.createFieldsFn(''));
    }
}
