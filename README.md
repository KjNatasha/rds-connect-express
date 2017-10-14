React.js x Node.js-express x MySQL
==============================

After set up *db-config.json*, you can execute the project.

db-config.json format

```
{
	"host"			: "your_db_domain(usally local eviroment, localhost)",
	"user"			: "your_id (usally, root)",
	"password"		: "your_pw",
	"database"		: "your_database_name"
}
```

'package.json's command list up
---

```
npm run clean
```

remove public/bundle.js file for clean up setting.

```
npm run build
```

make up public/bundle.js from app/{sourcefile}

```
npm run start
```

execute server on localhost, port 3000.