//  Get a given parameter from a URL query string
function getURLvalue(varname){
    varname = varname.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
    var regexS = '[\\?&]'+varname+'=([^&#]*)';
  var url = window.location.href;// First, we load the URL into a variable
  var qparts = url.split('?');// Next, split the url by the ?
  if (qparts.length == 0){
    return '';
  }// Check that there is a querystring, return "" if not
  var query = qparts[1];// Then find the querystring, everything after the ?
  if( query ){
    var vars = query.split('&');// Split the query string into variables (separates by &s)
  }else{var vars = qparts[0];}
  var value = '';// Initialize the value with "" as default
  for ( var i = 0; i < vars.length; i++ ){// Iterate through vars, checking each one for varname
    var parts = vars[i].split('=');// Split the variable by =, which splits name and value
    if (parts[0] == varname){// Check if the correct variable
      value = parts[1];// Load value into variable
      break;// End the loop
    }
  }
  value = unescape(value);// Convert escape code
  value.replace(/(%20|'%20'|[%20]|%C2%A0|'%C2%A0'|%20|%5F|' '|[+]|'%2B'|'+'|\+)/gi,'_');// Convert "+"s to "_"s
  value.replace(/(%3A|'%3A'|[%3A]|':'|[:]|\:)/gi,':');
  return value;// Return the value
}
//  Cleans up and returns the full URL as well as the various components
function getURLchunks(){
  let $baseURL = decodeURI( location["href"].replace(new RegExp(";","g"),"&") ), $protocol = decodeURI( location.protocol ),
      $pathname = decodeURI( location.pathname ), $folderPath = ( $pathname !== "" ) ? getFolderPath( $pathname ) : [], $href = $baseURL,
      $hash = decodeURI( location.hash ), $host = decodeURI( location.host ), $hostname = decodeURI( location.hostname ), $port = getPort( $protocol ),
      $origin = $protocol + "//" + $hostname + ":" + $port, $file = retrieveFilename( $pathname ), $fileName = $file.substr(0, $file.lastIndexOf(".") ),
      $fileExtension = getFileExtension( $file ), $search = decodeURI( location["search"].replace(new RegExp(";","g"),"&") ),
      $queries = cleanUpQueryStr( $search ), $parametersObj = $queries.paramsViaObject, $parametersArray = $queries.paramsViaArray;
  return {
    hash: $hash,
    host: $host,
    hostname: $hostname,
    href: $href,
    origin: $origin,
    pathname: $pathname,
    folderPath: $folderPath,
    port: $port,
    protocol: $protocol,
    file: $file,
    fileName: $fileName,
    fileExtension: $fileExtension,
    search: $search,
    parametersObj: $parametersObj,
    parametersArray: $parametersArray
  };
}
function retrieveFilename(url){
  let $fileString = ( url.lastIndexOf("/") !== -1 ) ? url.substring( url.lastIndexOf("/") + 1 ) : "";
  if( $fileString.indexOf("?") !== -1 ){$fileString = $fileString.substr(0, $fileString.indexOf("?") );}
  if( $fileString.indexOf("#") !== -1 ){$fileString = $fileString.substr(0, $fileString.indexOf("#") );}
  return $fileString;
}
function getFileExtension(file){
  return file.substring( file.lastIndexOf(".") + 1 );
}
function getPort(protocol){
  let port = decodeURI( location.port );//  If it is the default (HTTP = 80, HTTPS = 443) some browsers will display 0 or nothing.
  if( protocol === "http:" ){port = "80";}
  if( protocol === "https:" ){port = "443";}
  return port;
}
function getFolderPath(pathname){
  var A = pathname.substr(1, pathname.lastIndexOf("/") + 1 ), B = A.split("/"), C = [];
  for( let a = 0; a < B.length - 1; a++ ){C.push(B[a]);}
  return C;
}
function cleanUpQueryStr(queryString){
  let $queryStr = queryString.split("?")[1].replace(new RegExp(";","g"),"&"), $vars = $queryStr.split("&"), $obj = ( queryString !== "" ) ? {} : "";
  for( let i = 0, len = $vars.length; i < len; i++ ){
    let $current = $vars[i].split("=");
    $obj[ $current[0] ] = $current[1];
    $vars[i] = [ $current[0], $current[1] ];
  }
  return {paramsViaObject: $obj, paramsViaArray: $vars};
}
