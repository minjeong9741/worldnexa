import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

// =======================================================
// 1. 공통 컴포넌트
// =======================================================
function Header(props){
  return (
    <header>
      <h1>
        <a href="/" onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode();
        }}>
          {props.title}
        </a>
      </h1>
      {/* 장바구니 아이콘 추가 (UI 구현을 위한 더미) */}
      <div className="cart-icon">🛒</div>
    </header>
  );
};

// =======================================================
// 2. 상품 아이템 컴포넌트
// =======================================================
function ProductItem(props) {
  const p = props.product;
  
  // 가격 포맷팅 함수 (예: 35000 -> 35,000)
  const formattedPrice = p.price.toLocaleString('ko-KR'); 
  
  return (
    <div className="product-card">
      <img src={p.imageUrl} alt={p.name} className="product-image" />
      
      <div className="product-info">
        <h3>{p.brand}</h3>
        <p className="product-name">{p.name}</p>
        <p className="product-price">{formattedPrice}원</p>
        <button className="add-to-cart-btn" onClick={() => {
          alert(`${p.brand} - ${p.name} 상품을 담았습니다.`);
        }}>
          담기
        </button>
      </div>
    </div>
  );
}

// =======================================================
// 3. 상품 목록 컴포넌트
// =======================================================
function ProductList(props) {
  return (
    <div className="product-list-grid">
      {props.products.map(p => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}

// =======================================================
// 4. App 컴포넌트 수정
// =======================================================
function App() {
  const [mode, setMode] = useState('WELCOME'); 
  
  const [products, setProducts] = useState([
    {id: 1, brand: '브랜드A', name: '편안하고 착용감이 좋은 신발', price: 35000, imageUrl: 'image/shoe1.jpg'},
    {id: 2, brand: '브랜드A', name: '힙한 컬러가 매력적인 신발', price: 25000, imageUrl: 'image/shoe2.jpg'},
    {id: 3, brand: '브랜드B', name: '편안하고 착용감이 좋은 신발', price: 35000, imageUrl: 'image/shoe3.jpg'},
    {id: 4, brand: '브랜드B', name: '힙한 컬러가 매력적인 신발', price: 35000, imageUrl: 'image/shoe4.jpg'}
  ]);

  let content = null;
  
  if(mode === 'WELCOME'){
      content = (
        <div className="product-list-page">
          <h2>신발 상품 목록</h2>
          <p>현재 {products.length}개의 상품이 있습니다.</p>
          <ProductList products={products} />
        </div>
      );
  }

  return (
    <div className="App">
      <Header title="상품 목록" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      {content}
    </div>
  );
}

export default App;