import { Directive , ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appMaskCorreo]'
})
export class MaskCorreoDirective {

  private readonly Element: HTMLInputElement;
  constructor( public ref: ElementRef ) {
    this.Element = ref.nativeElement;  
  }  
  public setInput(value: any): void {
    this.Element.value = value;
    this.Element.dispatchEvent(new Event('input'));
  }
  public ngOnInit(): void {
    this.Element.autocomplete = 'off';
    
  }
  @HostListener('blur', ['$event']) blurEvent(e: any) {
    let val: string = <string>e.target.value;
    const regex: RegExp = new RegExp('[A-Za-z0-9_]*[@]{1}[A-Za-z0-9_]*.com');
    if(val.match(regex) !== null){
      const result = val.match(regex).join('');
      this.setInput(result);      
    }else{
      this.setInput(null);
      console.log(val.match(regex));
    }
  }
}

/*const regex: RegExp = new RegExp('[0-9]','g');
    let val: string = <string>e.target.value;
    let result = val.match(regex).join('/');
    console.log(result); */