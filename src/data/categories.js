export const categories = [
  {
    id: 1,
    name: "geography",
    description: "Countries, capitals, landmarks, and world geography",
    color: "blue",
    icon: "🌍"
  },
  {
    id: 2,
    name: "science",
    description: "Physics, chemistry, biology, and scientific discoveries",
    color: "green",
    icon: "🔬"
  },
  {
    id: 3,
    name: "history",
    description: "World history, important events, and historical figures",
    color: "orange",
    icon: "📚"
  },
  {
    id: 4,
    name: "literature",
    description: "Books, authors, poetry, and literary works",
    color: "purple",
    icon: "📖"
  },
  {
    id: 5,
    name: "art",
    description: "Paintings, artists, art movements, and creativity",
    color: "pink",
    icon: "🎨"
  },
  {
    id: 6,
    name: "mathematics",
    description: "Numbers, equations, geometry, and mathematical concepts",
    color: "red",
    icon: "🔢"
  },
  {
    id: 7,
    name: "sports",
    description: "Athletics, games, teams, and sporting events",
    color: "yellow",
    icon: "⚽"
  },
  {
    id: 8,
    name: "music",
    description: "Songs, artists, instruments, and musical genres",
    color: "teal",
    icon: "🎵"
  },
  {
    id: 9,
    name: "movies",
    description: "Films, actors, directors, and cinema",
    color: "cyan",
    icon: "🎬"
  },
  {
    id: 10,
    name: "technology",
    description: "Computers, gadgets, inventions, and digital world",
    color: "gray",
    icon: "💻"
  },
  {
    id: 11,
    name: "food",
    description: "Cuisines, recipes, ingredients, and culinary arts",
    color: "orange",
    icon: "🍳"
  },
  {
    id: 12,
    name: "animals",
    description: "Wildlife, pets, creatures, and animal kingdom",
    color: "brown",
    icon: "🐾"
  },
  {
    id: 13,
    name: "space",
    description: "Planets, stars, astronomy, and space exploration",
    color: "purple",
    icon: "🚀"
  },
  {
    id: 14,
    name: "politics",
    description: "Governments, leaders, elections, and political systems",
    color: "blue",
    icon: "🏛️"
  },
  {
    id: 15,
    name: "business",
    description: "Companies, economics, finance, and entrepreneurship",
    color: "green",
    icon: "💼"
  },
  {
    id: 16,
    name: "fashion",
    description: "Clothing, designers, trends, and style",
    color: "pink",
    icon: "👗"
  },
  {
    id: 17,
    name: "transportation",
    description: "Cars, planes, trains, and modes of travel",
    color: "blue",
    icon: "🚗"
  },
  {
    id: 18,
    name: "nature",
    description: "Plants, ecosystems, weather, and natural phenomena",
    color: "green",
    icon: "🌿"
  },
  {
    id: 19,
    name: "religion",
    description: "Faiths, beliefs, practices, and spiritual traditions",
    color: "yellow",
    icon: "⛪"
  },
  {
    id: 20,
    name: "philosophy",
    description: "Thinkers, ideas, logic, and human thought",
    color: "purple",
    icon: "🤔"
  },
  {
    id: 21,
    name: "medicine",
    description: "Health, diseases, treatments, and human body",
    color: "red",
    icon: "🏥"
  },
  {
    id: 22,
    name: "architecture",
    description: "Buildings, structures, design, and construction",
    color: "gray",
    icon: "🏗️"
  },
  {
    id: 23,
    name: "languages",
    description: "Words, grammar, linguistics, and communication",
    color: "blue",
    icon: "🗣️"
  },
  {
    id: 24,
    name: "mythology",
    description: "Legends, gods, heroes, and ancient stories",
    color: "orange",
    icon: "⚡"
  },
  {
    id: 25,
    name: "psychology",
    description: "Mind, behavior, emotions, and human nature",
    color: "pink",
    icon: "🧠"
  },
  {
    id: 26,
    name: "chemistry",
    description: "Elements, compounds, reactions, and chemical processes",
    color: "green",
    icon: "⚗️"
  },
  {
    id: 27,
    name: "physics",
    description: "Forces, energy, matter, and natural laws",
    color: "blue",
    icon: "⚛️"
  },
  {
    id: 28,
    name: "archaeology",
    description: "Ancient civilizations, artifacts, and discoveries",
    color: "brown",
    icon: "🏺"
  },
  {
    id: 29,
    name: "photography",
    description: "Cameras, techniques, photographers, and images",
    color: "gray",
    icon: "📸"
  },
  {
    id: 30,
    name: "dance",
    description: "Movement, choreography, styles, and performance",
    color: "pink",
    icon: "💃"
  },
  {
    id: 31,
    name: "comics",
    description: "Superheroes, graphic novels, and illustrated stories",
    color: "red",
    icon: "🦸"
  },
  {
    id: 32,
    name: "gaming",
    description: "Video games, board games, and interactive entertainment",
    color: "purple",
    icon: "🎮"
  }
];

export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

export const getCategoriesByIds = (ids) => {
  return categories.filter(category => ids.includes(category.id));
}; 