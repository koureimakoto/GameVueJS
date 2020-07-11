const MONSTER_LIFE = 100
const PLAYER_LIFE  = 100

const MAX_RECOVER            = 20
const MAX_MONSTER_DAMAGE     = 15
const MAX_PLAYER_DAMAGE      = 10

const PLAYER_CRITICAL_DAMAGE = 2

var app = new Vue ({
  el : '#app',
  data : {
    start       : true,
    winner      : false,
    lifePlayer  : PLAYER_LIFE,
    lifeMonster : MONSTER_LIFE,
    logs        : []
  },
  methods: {
    /*  MATH FUNCTIONS  */
    calculate(op){
      return op
    },

	
    rand(min, max){
      if(min < 0 || max <= min){
        console.log("Min/Max ERROR")
        return;
      }
      /* MDN - .ceil() func returns a number up to the next largest integer. */
      min = Math.ceil(min);
      /* MDN - .floor() func returns the largest integer less than or equal. */
      max = Math.floor(max);
      return ( Math.floor(Math.random() * (max - min) + 1) + min )
    },
    
    healing(fn){
      return ( (min,max)=>{ return fn(min,max) })
    },
  
    damage(fn){
      return ( (min,max)=>{ return (-1) * fn(min, max)})
    },
  
    /* PLAYER ACTIONS */
    
    attack(){
      if(this.verifyLife){
        calcDamage   = this.damage(this.rand)
        
        damageMonster = calcDamage(0, MAX_MONSTER_DAMAGE)
        damagePlayer  = calcDamage(0, MAX_PLAYER_DAMAGE )   
        
        this.lifePlayer  += damageMonster
        this.lifeMonster += damagePlayer
        
        /* Visual presentation of the attack */
        this.logs.push({type:'monster', damage : damageMonster})
        this.logs.push({type:'player' , damage : damagePlayer})
        
        this.aWinner()
      }
    },
    
    attackSpecial(){
      if(this.verifyLife){
        calcDamage   = this.damage(this.rand)
        
        damageMonster = calcDamage(0, MAX_MONSTER_DAMAGE)
        damagePlayer  = calcDamage(5, MAX_PLAYER_DAMAGE * PLAYER_CRITICAL_DAMAGE)
        
        this.lifePlayer  += damageMonster
        this.lifeMonster += damagePlayer
        
        /* Visual presentation of the attack */
        this.logs.push( {type:'monster', damage : damageMonster} )
        this.logs.push( {type:'player' , damage : damagePlayer } )

        this.aWinner()
      }
    },
   
    heal(){
      heal          = this.healing(this.rand)(3, MAX_RECOVER)
      damageMonster = this.damage(this.rand)(0, MAX_MONSTER_DAMAGE)
      
      if( (this.lifePlayer + heal) >= PLAYER_LIFE ){
        this.lifePlayer = PLAYER_LIFE
      }
      else {
        this.lifePlayer += heal
      }
      
      this.lifePlayer += damageMonster
      
      /* Visual presentation of the attack */
      this.logs.push({type:'monster', damage : damageMonster})
      this.logs.push({type:'heal'   , damage : heal})  
      
      this.aWinner() 
    },
    
    verifyLife(){
      if(this.lifeMonster > 0 || this.lifePlayer > 0){
        return true
      }
        return false
    },
    
    begin(){
      if(!this.start){
        this.logs        = []
        this.lifePlayer  = 100
        this.lifeMonster = 100
        this.start       = true
        this.winner      = false
      } 
      else {
        this.winner = true
        this.start  = false
      }
    },
    
    aWinner(){
      if(this.lifePlayer <= 0){
        this.winner     = true
        this.lifePlayer = 0
      }
      
      if(this.lifeMonster <=0){
        this.winner      = true
        this.lifeMonster = 0
      }
      else{
        this.winner = false	
      }
    }
  }
})
