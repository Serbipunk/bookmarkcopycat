function parseNode(bookmark_node) {
  var node_obj = new Object;
  var children_nodes = [];
  
  //when I can cope with Exception in Javascript, I will replace the 2 if lines
  if( bookmark_node.id ) {
    node_obj.id = bookmark_node.id;
  }
  if( bookmark_node.title ) {
    node_obj.title = bookmark_node.title;
  }
  if( bookmark_node.parentId ) {
    node_obj.parentId = bookmark_node.parentId;
  }
  if( bookmark_node.index ) {
    node_obj.index = bookmark_node.index;
  }
  if( bookmark_node.url ) {
    node_obj.url = bookmark_node.url;
  }
  if( bookmark_node.dateAdded ) {
    node_obj.dateAdded = bookmark_node.dateAdded;
  }
  if( bookmark_node.children ) {
    var i;
    for(i=0; i<bookmark_node.children.length; i++) {
      children_nodes.push(bookmark_node.children[i]);
    }
  }
  
  return [node_obj, children_nodes];
}

function dumpBookmarks(bookmark_nodes) {
  
  var i;
  
  var nodes_queue = [];
  var nodes_fid_queue = [];   //father's id queue
  
  var nodes_data = [];    //save nodes data in array
  var nodes_map = [];   //save relation of nodes
  
  for( i=0; i<bookmark_nodes.length; i++ ) {
    nodes_queue.push( bookmark_nodes[i] );
    nodes_fid_queue.push( -1 );
  }
  
  while( nodes_queue.length > 0 ) {
    var node = nodes_queue.shift();
    var fid = nodes_fid_queue.shift();
    
    var res = parseNode(node);
    var res_obj = res[0];
    var res_sons = res[1];
    
    // save this node's datum
    nodes_data.push(res_obj);
    // save relation of relation
    var id = -2;        // miss id's clue
    if( res_obj.id ) {
      id = res_obj.id;
    }
    nodes_map.push( {src: fid, dst: id} )
    
    //load children into queue
    var j=0;
    for(j=0; j<res_sons.length; j++) {
      nodes_queue.push( res_sons[j] );
      nodes_fid_queue.push( id );
    }
  }
  
  var bookmarks_obj = {data: nodes_data, structure: nodes_map};
  
  var json = JSON.stringify(bookmarks_obj);
  
  alert( json );
  
  return json;
}

document.addEventListener('DOMContentLoaded', function () {
  //dumpBookmarks();
  $('#bookmarks').append("hello bookmark");
  
  
  chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      
      dumpBookmarks( bookmarkTreeNodes );
      
    }
  );
  
  
});
