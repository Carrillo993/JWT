function Header() {
    return (
        <header
        className="relative h-64 md:h-50 bg-center bg-cover"
        style={{ backgroundImage: `url('/Header.jpg')` }}
        aria-label="Pizza"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold">
            ¡Pizzería Mamma Mía!
          </h1>
          <p className="mt-3 text-white text-sm md:text-lg max-w-xl">
            ¡Tenemos las mejores pizzas que podrás encontrar!
          </p>
        </div>
      </header>
    );
    }

export default Header;