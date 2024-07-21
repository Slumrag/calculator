import './Calculator.css';

function Calculator() {
  return (
    <div className='Calculator'>
      <div className='Calculator__body'>
        <p className='Calculator__history'>20×80×0,5</p>
        <input className='Calculator__input' type='numeric' value={`500`} />
        <div className='Calculator__divider'></div>
        <div className='Calculator__numpad'>
          <button className='Calculator__numpad-button' id='clear'>
            C
          </button>
          <button className='Calculator__numpad-button' id='sqrt'>
            √
          </button>
          <button className='Calculator__numpad-button' id='percent'>
            %
          </button>
          <button className='Calculator__numpad-button' id='divide'>
            /
          </button>
          {/* row1 */}
          <button className='Calculator__numpad-button' id='7'>
            7
          </button>
          <button className='Calculator__numpad-button' id='8'>
            8
          </button>

          <button className='Calculator__numpad-button' id='9'>
            9
          </button>
          <button className='Calculator__numpad-button' id='multiply'>
            ×
          </button>
          {/* row2 */}
          <button className='Calculator__numpad-button' id='4'>
            4
          </button>

          <button className='Calculator__numpad-button' id='5'>
            5
          </button>
          <button className='Calculator__numpad-button' id='6'>
            6
          </button>
          <button className='Calculator__numpad-button' id='subtract'>
            -
          </button>
          {/* row3 */}
          <button className='Calculator__numpad-button' id='1'>
            1
          </button>

          <button className='Calculator__numpad-button' id='2'>
            2
          </button>
          <button className='Calculator__numpad-button' id='3'>
            3
          </button>
          <button className='Calculator__numpad-button' id='add'>
            +
          </button>

          {/* row4 */}
          <button className='Calculator__numpad-button' id='00'>
            00
          </button>
          <button className='Calculator__numpad-button' id='0'>
            0
          </button>
          <button className='Calculator__numpad-button' id=','>
            ,
          </button>
          <button className='Calculator__numpad-button Calculator__numpad-button_solid' id='equals'>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
