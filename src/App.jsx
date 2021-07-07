import React, { useState } from 'react';
import './App.css';
import { userData } from './userData';

const Cart = (props) => {
  return (
    <div className="item" onClick={() => props.showModal(props.user)}>
      <h2>Name:{props.user.name}</h2>
      <img src={props.user.picture} />
      <h2>Age:{props.user.age}</h2>
      <h3>Gender:{props.user.gender}</h3>
      <h3>Balance:{props.user.balance}</h3>
    </div>
  )

}
const Modal =(props)=>{
  console.log(props)
  return(
    <>

    <div className='fon-modal' onClick={props.closeModal}>
      <div className='modal' onClick={e => e.stopPropagation()}>
        <p>Id:{props.userMod.name}</p>
        <p>Age:{props.userMod.age}</p>
        <p>EyeColor:{props.userMod.eyeColor}</p>
        <p>Name:{props.userMod.name}</p>
        <p>Gender:{props.userMod.gender}</p>
        <p>Company:{props.userMod.company}</p>
        <p>Email:{props.userMod.email}</p>
        <p>Phone:{props.userMod.phone}</p>
      </div>
    </div>
    </>
  )
}
const RenderCart = (props) => {
  return (
    <div className="wrap">
      {props.items.map(item => <Cart showModal={props.showModal} user={item} />)}
    </div>
  )
}

const Search = (props) => {
  return (
    <>
      <input className="search" onChange={props.SearchOn}
        value={props.value}
      ></input>
    </>
  )
}

const Sort = (props) => {
  return (
    <div className="sort">
    <span>Sort of age</span>
      <select value={props.value} onChange={props.sorts}>
        <option value='1'>Not Sort </option>
        <option value='2'>to more </option>
        <option value='3'>to less  </option>
      </select>
    </div>

  );
}



const App = () => {
  let [state, setState] = useState(userData);
  let [search, setSearch] = useState(userData);
  let [sort, setSort] = useState('1');
  let [showsModal,setModal]= useState({isShow:false,data: {}})

  console.log(state);
  let SearchOn = (a) => {
    const valuer = a.target.value;
    const result = userData.filter(item => item.name.toLowerCase().includes(valuer.toLowerCase()));

    setState(result);
    setSearch(result);
    console.log(result)
  }
  let sorts = (b) => {
    setSort(b)
    
    if (b=='1'){
      setState(userData)
      return
    }
    if ( b.target.value == '1') {
      console.log('1')
      setState(userData)
      return
    }
    if (b.target.value=== '2') {
      console.log('2')
      let result = [...search].sort((el1, el2) => el1.age - el2.age)
      setState(result)
      console.log(result)
      return
    }
    if (b.target.value === '3') {
      console.log('3')
      let result = [...search].sort((el1, el2) => el2.age - el1.age)
      setState(result)
      console.log(result)
      return

    }

  }
  let showModal=(item)=>{
    setModal({
      isShow:true,
      data:item,
    
    })
  }
  let closeModal = ()=>{
    setModal({isShow:false,
              data:{}
    })
  }

  return (
    <><div>
      <header>
      <Search SearchOn={SearchOn} />
      <Sort sorts={sorts} />
      <button className='clear' onClick={() => {
        setSearch(userData)
        setState(userData)
        sorts('1')
      }}> clear </button>
      </header>
      <RenderCart items={state}  showModal={showModal}/>
      </div>
      {showsModal.isShow && <Modal userMod={showsModal.data} closeModal={closeModal}/>}
    </>
  );

}


export default App;