import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appMask]'
})
export class MaskDirective {
  public Allow : number[] = [8,48,49,50,51,52,53,54,55,56,57]; //variable allow de clase array number en donde guardaremos los numeros de los eventos
                                 //ejemplo keyCode: 8 es el codigo de la tecla borrar
  private readonly Element: HTMLInputElement; //Creamos la propiedad Element de tipo HTMLInputElement
 
  constructor( public ref: ElementRef ) {  //obtenemos la referencia de mis elementos html
    this.Element = ref.nativeElement;  //le asigo a mi elemento la etiqueta html
  }  
  //Validaciones
  public setInput(value: any): void {
    this.Element.value = value;
    this.Element.dispatchEvent(new Event('input'));
  }
  //Manejo de eventos
  @HostListener('keyup',['$event']) public showevent(event): void { //Listener se utiliza para obtener los eventos desde el html
    const val = event.target.value;
    if(this.Allow.includes(+event.keyCode)){ //+ es para realizar el casteo ya que keyCode devuelve un string
      this.setInput(val);
      console.log(event);
    } else {
      const regex: RegExp = new RegExp('[0-9]','g');
      if(val.match(regex) !== null){
        const result = val.match(regex).join('');
        this.setInput(result);
      }else {
        this.setInput(null);
      }
    }
  }

  public ngOnInit(): void {
    this.Element.autocomplete = 'off';
  }

  @HostListener('focus', ['$event']) focusEvent(e: any) {
    this.clearEndInput();
  }

  @HostListener('blur', ['$event']) blurEvent(e: any) {
    this.setInput(e.target.value + ',00');
  }

  public clearEndInput(): void {
    const value: string = this.Element.value.replace( ',00', '');

    if (value.length === 0) {
      this.setInput('');
    } else {
      this.setInput(value);
    }
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}
