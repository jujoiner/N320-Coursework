var app = new Vue({
    el:"#app",
    mounted: function(){
        axios.get('data/games.json')
        .then((response)=>{

            this.game = response.data.game;
        });
    },
    data:{
        game:[]
    },
    methods:{

    }
})