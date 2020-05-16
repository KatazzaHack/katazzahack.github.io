

q = new Graph();


export function Graph() {
  var options = {};
  var data = new vis.DataSet(options);
  this.nodes = new vis.DataSet(options);
  this.edges = new vis.DataSet(options);
  this.lifes = new Array([]);
  this.matrix = new Array();
  this.network_size = 0;
  this.network;
  this.click_type = 2;
  this.edges_list = new Array();
  this.take_color = {0: "black", 1: "red", 2: "yellow", 3: "green"};
  // this.img_dir = "%PUBLIC_URL%/sources/images/" https://github.com/KatazzaHack/katazzahack.github.io/blob/master/source/images/mask1.png?raw=true
  this.img_dir = "https://raw.githubusercontent.com/KatazzaHack/katazzahack.github.io/master/source/images/";
  this.take_image = {
3: {0: this.img_dir + "mask1.png",
    1: this.img_dir + "mask2.png",
    2: this.img_dir + "mask3.png"},
2: {0: this.img_dir + "nomask1.png",
    1: this.img_dir + "nomask2.png",
    2: this.img_dir + "nomask3.png"},
1: {0: this.img_dir + "vir1.png",
    1: this.img_dir + "vir2.png",
    2: this.img_dir + "vir3.png"}};

}

Graph.prototype.get_new_network = function () {
  this.lifes = [1, 1, 2, 0, 1, 1, 1, 2, 3];
  var edges_got = [[0, 2], [1, 3], [1, 4], [1, 5] , [1, 8], [4, 7],  [7, 8]];
  this.edges_list = edges_got.slice();
  this.types = new Array();
  this.matrix = new Array();
  this.network_size = this.lifes.length;
  for (let i = 0; i < this.network_size; ++i) {
    this.types.push(Math.floor(Math.random() * 3));
    this.matrix.push(new Array());
  }
  for (let i = 0; i < edges_got.length; i++) {
    if ((this.lifes[edges_got[i][0]] != 0) && (this.lifes[edges_got[i][1]] != 0)) {
      this.matrix[edges_got[i][0]].push(edges_got[i][1]);
      this.matrix[edges_got[i][1]].push(edges_got[i][0]);
    }
  }
};

Graph.prototype.draw_network = function () {
  var container = document.getElementById('game-container');
  
  for (let i = 0; i < this.network_size; i++) {
    if (this.lifes[i] != 0) {
      this.nodes.add({id: i + 1, label: '', image: this.take_image[this.lifes[i]][this.types[i]], shape: 'circularImage',
      border: '1', borderWidthSelected: '10', color: this.take_color[this.lifes[i]]});
    }
  }
  for (let i = 0; i < this.edges_list.length; i++) {
    this.edges.add({from: this.edges_list[i][0] + 1, to: this.edges_list[i][1] + 1, color: 'blue'});
  }
  var data = {
    nodes: this.nodes,
    edges: this.edges
  };
  var options = {
    nodes: {
      borderWidth:4,
      size:40,
      color: {
        border: '#222222',
        background: '#666666'
      },
      font:{color:'#eeeeee'}
    },
    edges: {
      color: 'lightgray'
    }
  };
  this.network = new vis.Network(container, data, options);
}

Graph.prototype.set_click_type = function (click_type) {
  this.click_type = click_type;
  q.click_type = click_type;
}

Graph.prototype.on_node_selected = function (event) {
  // console.log(event);
  var selected_node = event.nodes[0] - 1;
  console.log(selected_node);
}

Graph.prototype.on_double_click = function (event) {
  var selected_node = event.nodes[0] - 1; // effect +- 1
  if (!(q.click_type in [0, 1, 2])) {
    alert("please select a click type");
    // return 1;
  }
  var nodes_to_decrease = new Array();
  nodes_to_decrease.push(selected_node);
  for (let counter = 0; counter < q.click_type; ++counter) {
    let max_cnt = nodes_to_decrease.length;
    for (let i = 0; i < max_cnt; ++i) {
      let vertex = nodes_to_decrease[i];
      for (let j = 0; j < q.matrix[vertex].length; ++j) {
        let maybe_new = q.matrix[vertex][j];
        if (!(nodes_to_decrease.includes(maybe_new))) {
          nodes_to_decrease.push(maybe_new);
        }
      }
    }
  }
  console.log(nodes_to_decrease);
  q.decrease_life(nodes_to_decrease);
  q.redraw_network();
}

Graph.prototype.decrease_life = function (nodes_to_decrease) {
  // for (let c = 0; c < nodes_to_decrease.length; c++) {
    // lifes[nodes_to_decrease[c]] = 
  // }
}

Graph.prototype.init_listeners = function () {
  this.network.on("selectNode", this.on_node_selected);
  this.network.on("doubleClick", this.on_double_click);
  document.getElementById('game-container').addEventListener('attack', this.attack);
}

Graph.prototype.prepare = function () {
  this.get_new_network();
}

Graph.prototype.start = function () {
  this.draw_network();
  this.init_listeners();
}

q.prepare();
