require('dotenv').config();
const express = require("express");
const app = express();
const port = 7000; //bisa mengganti port

const path = require("path"); //bawaan path node js
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const upload = require("./midlewares/upload-file"); //midleware multer

const collectionModel = require("./models").collections;
const userModel = require("./models").users;
const taskModel = require("./models").tasks;


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); //dirname merujuk project dgn nama views

app.use("/assets", express.static(path.join(__dirname, "assets"))); //agar bisa membuka file assets
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //agar bisa membuka file assets

app.use(express.urlencoded({ extended: false })); //"extended" agar post tidak deprecated
app.use(
  session({
    name: "my-session",
    secret: "ewVsqWOyeb",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(flash());

//ROUTING
app.get("/", home);
app.get("/collection", collection);
app.get("/add-collection", addCollectionView);
app.post("/add-collection", upload.single("uploadImage"), addCollection);

app.get("/delete-collection/:id", deleteCollection); //penggunaan ":id" adalah properti
app.get("/edit-collection/:id", editCollectionView);
app.post("/edit-collection/:id", upload.single("uploadImage"), editCollection);

app.get("/collection-detail/:id", collectionDetail);

app.get("/login", loginView);
app.get("/register", registerView);

app.post("/login", login);
app.post("/register", register);
app.get("/logout", logout);

//SERVICE
function loginView(req, res) {
  res.render("login");
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // cek email user apakah ada di database
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      req.flash("error", "Email / password salah!");
      return res.redirect("/login");
    }

    // cek password apakah valid dengan password yang sudah di hash
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      req.flash("error", "Email / password salah!");
      return res.redirect("/login");
    }

    req.session.user = user;

    req.flash("success", "Login berhasil!");

    res.redirect("/");
  } catch (error) {
    req.flash("error", "Something went wrong!");
    res.redirect("/");
  }
}

function registerView(req, res) {
  res.render("register");
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    req.flash("success", "Register berhasil!");
    res.redirect("/register");
  } catch (error) {
    req.flash("error", "Register gagal!");
    res.redirect("/register");
  }
}

async function logout(req, res) {
  try {
    req.flash("success", "Successfully logged out");
    req.session.destroy(() => {
      return res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    req.flash("danger", "Failed to Logout");
    res.redirect("/login");
  }
}

//HOME INDEX
async function home(req, res) {
  const result = await collectionModel.findAll();
  const user = req.session.user;

  res.render("index", { data: result, user });
}

//collection
async function collection(req, res) {
  const result = await collectionModel.findAll();

  const user = req.session.user;

  res.render("collection", { data: result, user }); //data merujuk ke DB Postgres
}

async function addCollectionView(req, res) {
  const result = await collectionModel.findAll();

  const user = req.session.user;

  res.render("add-collection", { data: result, user }); 
}

async function addCollection(req, res) {
  const { nameColl, image,} = req.body;
  // const { nameTask, isDone,} = req.body;


  const imagePath = req.file.path;

  const newblog = await collectionModel.create({ 
    nameColl: nameColl,
    image: imagePath,
    userId: req.session.user.id,
  });

  console.log(newblog)
  
  res.redirect("/collection"); //langsung menuju page blog
}

//DELETE BUTTON
async function deleteCollection(req, res) {
  const { id } = req.params;

  let result = await collectionModel.findOne({
    where: {
      id: id,
    },
  });

  if (!result) return res.render("not-found");

  await collectionModel.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/collection");
}

//EDIT BUTTON PER id
async function editCollectionView(req, res) {
  const user = req.session.user;
  const { id } = req.params;
  const result = await collectionModel.findOne({
    where: {
      id: id,
    },
  });
  if (!user) return res.redirect("/login"); //mengamankan routing
  if (!result) return res.render("not-found");
  res.render("edit-collection", { data: result, user });
}

//EDIT PAGE
async function editCollection(req, res) {
  try {
    const { id } = req.params;
    const { nameColl, existImage} =
      req.body;

    let imagePath = req.file.path;
  
    const collection = await collectionModel.findOne({
      where: {
        id: id,
      },
    });

    if (!collection) return res.render("not-found");

    collection.nameColl = nameColl;
   

    if (req.file) {
      collection.image = imagePath;
    } else {
      collection.image = existImage;
    }

    await collection.save("/collection"); //upsert = update/insert untuk create jika primary kosong
    res.redirect("/collection");

    // req.flash("success", "Blog updated successfully!");
    // return res.redirect("/collection");
  } catch (error) {
    // req.flash("error", "Something went wrong!");
    return res.redirect("/collection");
  }
}

async function collectionDetail(req, res) {
  try {
    const { id } = req.params;
    const user = req.session.user;

    const result = await collectionModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    // console.log("detail", result);
    const allCollection = await collectionModel.findAll();

    if (!result) {
      // return res.render("not-found");
      return res.redirect("/");
    }

    res.render("collection-detail", { data: result, user, allCollection });
  } catch (error) {
    console.error("Error in collectionDetail:", error);
    return res.redirect("/");
  }
}

//END ROUTING
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
