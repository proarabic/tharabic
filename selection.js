function selectCode(a)    
{    
   var e = a.parentNode.parentNode.getElementsByTagName('p')[0];    
   if (window.getSelection)    
   {    
      var s = window.getSelection();    
       if (s.setBaseAndExtent)    
      {    
         s.setBaseAndExtent(e, 0, e, e.innerText.length - 1);    
      }    
      else    
      {    
         var r = document.createRange();    
         r.selectNodeContents(e);    
         s.removeAllRanges();    
         s.addRange(r);    
      }    
   }    
   else if (document.getSelection)    
   {    
      var s = document.getSelection();    
      var r = document.createRange();    
      r.selectNodeContents(e);    
      s.removeAllRanges();    
      s.addRange(r);    
   }    
   else if (document.selection)    
   {    
      var r = document.body.createTextRange();    
      r.moveToElementText(e);    
      r.select();    
   }    
}    
