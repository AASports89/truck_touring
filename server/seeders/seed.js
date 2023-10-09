const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');
const bookSeeds = require('./bookSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < bookSeeds.length; i++) {
      const user = await User.findOneAndUpdate(
        { username: "BookMan" },
        {
          $addToSet: {
            savedBooks: [
              {
                authors: [
                  "J. K. Rowling"
                ],
                bookId: "wAdCPgAACAAJ",
                title: "Harry Potter and the Philosopher's Stone",
                description: "Harry Potter is an ordinary boy who lives in a cupboard under the stairs at his Aunt Petunia and Uncle Vernon's house, which he thinks is normal for someone like him who's parents have been killed in a 'car crash'. He is bullied by them and his fat, spoilt cousin Dudley, and lives a very unremarkable life with only the odd hiccup (like his hair growing back overnight!) to cause him much to think about. That is until an owl turns up with a letter addressed to Harry and all hell breaks loose! He is literally rescued by a world where nothing is as it seems and magic lessons are the order of the day. Read and find out how Harry discovers his true heritage at Hogwarts School of Wizardry and Witchcraft, the reason behind his parents mysterious death, who is out to kill him, and how he uncovers the most amazing secret of all time, the fabled Philosopher's Stone! All this and muggles too. Now, what are they?",
                "image": "http://books.google.com/books/content?id=wAdCPgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
              },
              {
                authors: [
                  "Warner Bros."
                ],
                  bookId: "VLWIMAEACAAJ",
                title: "Harry Potter Film Wizardry",
                description: "Immerse yourself in the world of the spectacular Harry Potter film series, and learn why Yule Ball ice sculptures never melt, where Galleons, Sickles and Knuts are really \"minted\", how to get a Hippogriff to work with actors, about the inspiration behind Hogwarts castle, and why Dementors move the way they do. Written and designed in collaboration with the cast and crew that brought J.K Rowling's celebrated novels to the silver screen, Harry Potter: Film Wizardry delivers an enchanting interactive experience, transporting readers to the wizarding world by sharing filmmaking secrets, unpublished photography and artwork, and exclusive stories from the stars. Full of removable, facsimile reproductions of props and paper ephemera from the movies, this collectible volume offers a privileged look at the Harry Potter films and the talented group of Muggles that has made true movie magic.",
                image: "http://books.google.com/books/content?id=VLWIMAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
              },
            ],
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Success ✅ Seeds planted 🎄');
  process.exit(0);
});
