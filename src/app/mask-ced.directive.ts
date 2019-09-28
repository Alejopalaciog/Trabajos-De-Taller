import { Directive, ElementRef, HostListener } from '@angular/core';
let c = 0;
@Directive({
  selector: '[appMaskCed]'
})
  
export class MaskCedDirective {
  private readonly Element: HTMLInputElement;
  public Allow : number[] = [8,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];
  public zero: number [] = [48,96];
  constructor( public ref: ElementRef ) {
    this.Element = ref.nativeElement;  
  }  
  public setInput(value: any): void {
    this.Element.value = value;
    this.Element.dispatchEvent(new Event('input'));
  }

  @HostListener('keyup',['$event']) public showevent(event): void { //Listener se utiliza para obtener los eventos desde el html
    c++;
    const val = <string>event.target.value;
    
    if(this.zero.includes(+event.keyCode) && val.charAt(0)=="0"){
      this.setInput(null);
    }else{
      if(this.Allow.includes(+event.keyCode)){ //+ es para realizar el casteo ya que keyCode devuelve un string
        this.setInput(val);
        console.log(event);
      } else {
        const regex: RegExp = new RegExp('[0-9]{9}','g');
        if(val.match(regex) !== null){
          const result = val.match(regex).join('');
          this.setInput(result);
        }else {
          this.setInput(null);
        }
      }
    }
    
    
    
  }

  public ngOnInit(): void {
    this.Element.autocomplete = 'off';
  }

  @HostListener('blur', ['$event']) blurEvent(e: any) {
    let fragmentar:string = <string>e.target.value;
    if(fragmentar.length==10){
    this.setInput(fragmentar.charAt(0)+"."+fragmentar.substring(1,4)+"."+
                  fragmentar.substring(4,7)+"."+fragmentar.substring(7,10));
    }else{
      this.setInput(null);
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
/*if(+event.keyCode==48){
      this.setInput(null);
    } */




    /*if(this.Allow.includes(+event.keyCode)){ //+ es para realizar el casteo ya que keyCode devuelve un string
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
    } */

    /*if(c==0){
      let regex: RegExp = new RegExp('[1-9]','g');
      console.log(regex);
    }else { 
        let regex: RegExp = new RegExp('[0-9]','g');
        console.log(regex);
       }*/


       /*if (this.zero.includes(+event.keyCode) && c==1) {
      let regex: RegExp = new RegExp('[1-9]','g');
      const result = val.match(regex).join('');
      this.setInput(result);
    }
    if(this.Allow.includes(+event.keyCode)){
      this.setInput(val);
      //console.log(event);
     }else{ 
      let regex: RegExp = new RegExp('[0-9]','g');      
      if(val.match(regex) !== null){
        const result = val.match(regex).join('');
        this.setInput(result);
      }else{
        this.setInput(null);
      }          
    }*/