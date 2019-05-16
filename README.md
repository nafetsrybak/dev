Some changes to SeedDMS 5.1.9 https://www.seeddms.org

What's new:

1) It is necessary that each user of a particular group perform an action.
	Once user was added to or removed from the group, the number of users needed for the transition to the next stage of the process will be updated.

2)  The ability to control user views of individual versions of documents was added.
	When updating the document version, views belonging to the old one are not counted. The views are deleted along with the deletion of the document version.
	
	For that You need to create a database of tblViews with the columns id, DocCon, userid, name, status, date.
	id - int, AUTO_INCREMENT, PRIMARY
	DocCon - int, Null-No, Default-No, make indexing by type INDEX
	userid - int, Null-Yes, Default-Null, make indexing by type INDEX
	name - varchar, length-100, Null-Yes, Default-Null
	status - tinyint, Null-No, Default-0
	date-datetime, Null-No, Default-No

	Or use this:
	CREATE TABLE `tblViews` ( `id` INT NOT NULL AUTO_INCREMENT , `DocCon` INT NOT NULL , `userid` INT NOT NULL , `name` VARCHAR(100) NULL DEFAULT NULL , `status` TINYINT NOT NULL DEFAULT '0' , `date` DATETIME NOT NULL , PRIMARY KEY (`id`), INDEX (`DocCon`), INDEX (`userid`)) ENGINE = InnoDB;

	And to create a foreign key:
	ON DELETE - CASCADE
	ON UPDATE - CASCADE
	Column - DocCon (left)
	The table is tblDocumentContent
	Columns - id (right)

	Or use this:
	ALTER TABLE `tblViews` ADD FOREIGN KEY (`DocCon`) REFERENCES `tblDocumentContent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;