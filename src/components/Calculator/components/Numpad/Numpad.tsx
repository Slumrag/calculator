interface NumpadProps {
  handleNumpadClick?: (value: string) => void;
}

export function Numpad({ handleNumpadClick }: NumpadProps) {
  return (
    <div
      className='Calculator__numpad'
      onClick={(event) => {
        const target = event.target as HTMLButtonElement;

        if (!target.id) return;
        handleNumpadClick && handleNumpadClick(target.id);
      }}
      data-testid='Calculator__numpad'
    >
      <button className='Calculator__numpad-button' id='clear' data-testid='clear'>
        C
      </button>
      <button className='Calculator__numpad-button' id='sqrt' data-testid='sqrt'>
        √
      </button>
      <button className='Calculator__numpad-button' id='percent' data-testid='percent'>
        %
      </button>
      <button className='Calculator__numpad-button' id='divide' data-testid='divide'>
        /
      </button>
      {/* row1 */}
      <button className='Calculator__numpad-button' id='7' data-testid='7'>
        7
      </button>
      <button className='Calculator__numpad-button' id='8' data-testid='8'>
        8
      </button>

      <button className='Calculator__numpad-button' id='9' data-testid='9'>
        9
      </button>
      <button className='Calculator__numpad-button' id='multiply' data-testid='multiply'>
        ×
      </button>
      {/* row2 */}
      <button className='Calculator__numpad-button' id='4' data-testid='4'>
        4
      </button>

      <button className='Calculator__numpad-button' id='5' data-testid='5'>
        5
      </button>
      <button className='Calculator__numpad-button' id='6' data-testid='6'>
        6
      </button>
      <button className='Calculator__numpad-button' id='subtract' data-testid='subtract'>
        -
      </button>
      {/* row3 */}
      <button className='Calculator__numpad-button' id='1' data-testid='1'>
        1
      </button>

      <button className='Calculator__numpad-button' id='2' data-testid='2'>
        2
      </button>
      <button className='Calculator__numpad-button' id='3' data-testid='3'>
        3
      </button>
      <button className='Calculator__numpad-button' id='add' data-testid='add'>
        +
      </button>

      {/* row4 */}
      <button className='Calculator__numpad-button' id='00' data-testid='00'>
        00
      </button>
      <button className='Calculator__numpad-button' id='0' data-testid='0'>
        0
      </button>
      <button className='Calculator__numpad-button' id=',' data-testid=','>
        ,
      </button>
      <button
        className='Calculator__numpad-button Calculator__numpad-button_solid'
        id='equals'
        data-testid='equals'
      >
        =
      </button>
    </div>
  );
}
