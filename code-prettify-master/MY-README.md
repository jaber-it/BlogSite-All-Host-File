</br></br>

Pre Code Fon Color and Style Css File একটি ফাইলের মধ্যেই  Pre Code এর ফন্ট কালাম ও Css Style লিংক ব্যবহার করা হয়েছে, </br>
Css Style লিংক আলাদাভাবে ব্যবহার করার দরকার নাই। </br></br>
</br></br></br></br>
    /* sunburst.css------------------- File Detels
    এই CSS টি শুধু মাত্র Pre Code And XMP এর Class জন্য ব্যবহার করা হয়েছে। 
    এই  URL CSS File টি শুধু run_prettify Lng URL এর ভিতর Sub-URL হিসেবে ব্যবহার করা হয়েছে
    */
</br></br></br></br>
=========================================================


<head>
All CDN URL-
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?autoload=true&amp;skin=sunburst&amp;lang=css" defer=""></script>

=========================================================
style -
<style type="text/css">
.operative { font-weight: bold; border: 1px solid yellow; }
#quine { border: 4px solid #88c; }
</style>
</head>

=========================================================
<body>
<pre class="prettyprint" id="quine"></pre>
<script type="text/javascript">//<![CDATA[
(function () {
  function htmlEscape(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
 
  // this page's own source code
  var quineHtml = htmlEscape(
    '<!DOCTYPE html>\n<html>\n' +
    document.documentElement.innerHTML +
    '\n<\/html>\n');
 
  // Highlight the operative parts:
  quineHtml = quineHtml.replace(
    /&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g,
    '<span class="operative">$&<\/span>');
 
  // insert into PRE
  document.getElementById("quine").innerHTML = quineHtml;
})();
//]]>
</script>
</body>
=========================================================

