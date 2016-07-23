// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Search the bookmarks when entering the search keyword.

function splitNode(bookmark_node) {
  var node_obj = {};
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
  if( bookmark_node.children.length>0 ) {
    var i;
    for(i=0; i<bookmark_node.children.length; i++) {
      children_nodes.push(bookmark_node.children[i]);
    }
  }
  
  return [node_obj, children_nodes];
}

function dumpTreeNodes(bookmark_nodes) {
  var i;
  var bms_obj = {}
  /*
  for (i = 0; i < bookmark_nodes.length; i++) {
    
  }
  */
  var res = splitNode( bookmark_nodes[0] );
}


document.addEventListener('DOMContentLoaded', function () {
  //dumpBookmarks();
  $('#bookmarks').append("hello bookmark");
  var str = ""
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query))
      dumpTreeNodes(bookmarkTreeNodes);
    }
  );
  $('bookmarks').append("fuck there");
});
