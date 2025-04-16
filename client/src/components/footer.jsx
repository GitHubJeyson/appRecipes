import logo from '../assets/logo.png'

export function Footer() {
    return (
      <footer className="bg-neutral-800 text-zinc-300 p-6 mx-6">
        <div className="mx-auto text-center flex items-center justify-center space-x-1">
          <img src={logo} alt='Logo ISTV' className="h-10" />
          <p className="text-sm">
            &copy;ISTVL período 2024-II. Autor: Yanez Jeyson. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    );
  }
  