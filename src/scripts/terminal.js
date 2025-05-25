import { Terminal } from '@xterm/xterm';
import '../../public/styles/xterm.css';

const terminal = new Terminal({
    cursorBlink: true,
    rows: 20,
    theme: {
        background: '#000000',
        foreground: '#00ff00'
    }
});

terminal.open(document.getElementById('xterm-container'));
terminal.write('Welcome to your web terminal\r\n');

