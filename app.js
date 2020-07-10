new Vue ({
  el : '#app',
  data : {
    start : true,
    lifePlayer : 100,
    lifeMonster : 100,
    Winner : false,
    logs : []
  },
  methods: {
    attack(){
      if(this.verifyLife){
        damage = this.calculateDamage()
        damageMonster = damage + 2
        damagePlayer = damage
        this.lifePlayer -= damageMonster
        this.lifeMonster -= damagePlayer
        this.logs.push({type:'monster', damage : damageMonster})
        this.logs.push({type:'player', damage : damagePlayer})
        this.aWinner()
        this.lifeFinish()
      }
    },
    attackSpecial(){
      if(this.verifyLife){
        damage = this.calculateDamage()
        damageMonster = damage
        damagePlayer = damage + 3
        this.lifePlayer -= damageMonster
        this.lifeMonster -= damagePlayer
        this.logs.push({type:'monster', damage : damageMonster})
        this.logs.push({type:'player', damage : damagePlayer})
        this.aWinner()
        this.lifeFinish()
      }
    },
    heal(){
      damages = this.calculateDamage()
      this.lifePlayer -= damages
      if((this.lifePlayer + damages) >= 100){
        this.lifePlayer = 100
      } else {
        this.lifePlayer += damages + 2
      }
      this.logs.push({type:'monster', damage : damages})
      this.logs.push({type:'heal', damage : damages+2})
      
    },
    verifyLife(){
      if(this.lifeMonster > 0 || this.lifePlayer > 0){
        return true
      }else {
        return false
      }
    },
    calculateDamage(){
      calculate = Math.round(Math.random()*10)

      while(calculate == 0){
        calculate = Math.round(Math.random()*10)
      }

      return calculate
    },
    begin(){
      if(!this.start){
        this.logs = []
        this.lifePlayer = 100
        this.lifeMonster = 100
        this.start = true
        this.Winner = false
      } else {
        this.Winner = true
        this.start = false
      }
    },
    aWinner(){
      if(this.lifePlayer <= 0 || this.lifeMonster <=0){
        this.Winner = true
      }else{
        this.Winner = false
      }
    },
    lifeFinish(){
      if(this.lifeMonster <= 0) {
        this.lifeMonster = 0
      } if(this.lifePlayer <= 0) {
        this.lifePlayer = 0
      }
    }
  }
})