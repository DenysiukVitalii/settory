var MyFooter = React.createClass({
  
  toPromocode: function() {
    ReactDOM.render(<ShowPromo items={promoArr}/>, document.getElementById('reactBox'));
  },

  toUsers: function() {
    ReactDOM.render(<FilteredList itemsIn={dataArr}/>, document.getElementById('reactBox'));
  },

  toOrders: function() {
    ReactDOM.render(<ShowOrderWrap/>, document.getElementById('reactBox'));
  },

  toOurCleaning: function() {
    var bool1 = false;
    ReactDOM.render(<FilterOrder itemsIn={orderArr} check={bool1}/>, document.getElementById('reactBox'))
  },  

  render: function() {

    return (
      <div className="wrapperFooter">
        <div className="footerBlock">
          <div className="footerContent">
            <div className="footerContentBox">
              <img className="logo" src="../../static/img/logo.png" alt=""></img>
              <div className="tags">
                <a href="https://www.instagram.com/settory/" className="SettoryId">#settory</a>
                <a href="https://www.instagram.com/explore/tags/settoryclean/" className="SettoryId">#settoryclean</a>
              </div>
            </div>
            <div className="footerContentBox">
              <div className="site-map">
                <a className="nav-link promocode-link" onClick={this.toPromocode}>Промокод</a>
                <a className="nav-link users-link" onClick={this.toUsers}>Користувачі</a>
                <a className="nav-link orders-link" onClick={this.toOrders}>Замовлення</a>
                <a className="nav-link our-cleaning-link" onClick={this.toOurCleaning}>Ваші прибирання</a> 
              </div>
            </div>
            <div className="footerContentBox iconBlock">
              <div>
                <p>Потрібна допомога - телефонуйте: <br></br> 068 305 82 54</p>
                <div>
                  <a href="#" className="icon-fa"><i className="fa fa-envelope" aria-hidden="true"></i></a>
                  <a href="#" className="icon-fa"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
                  <a href="#" className="icon-fa"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
