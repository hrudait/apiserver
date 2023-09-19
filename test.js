import verifier from 'email-verify'

verifier.verify( 'info@sjapm.com', function( err, info ){
  if( err ) console.log(err);
  else{
    console.log( "Success (T/F): " + info.success );
    console.log( "Info: " + info.info );
    console.log(info);
  }
});
