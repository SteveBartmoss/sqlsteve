
import { readFile } from 'fs/promises';

function setFieldType(campo) {

    switch (campo.typeField) {

        case 'int':
        case 'bigint':
        case 'bool':
        case 'bolean':
        case 'date':
            return `${campo.nameField} ${campo.typeField}`

        case 'float':
        case 'double':
        case 'decimal':
            return `${campo.nameField} ${campo.typeField}(${campo.sizeField},${campo.floatField})`

        case 'char':
        case 'varchar':
        case 'binary':
        case 'varbinary':
        case 'bit':
        case 'tinyint':
        case 'smallint':
        case 'mediumint':  
            return `${campo.nameField} ${campo.typeField}(${campo.sizeField})`

    }
}

export const runProto = async (fileName) => {

    const jsonContent = await readFile(`./protos/${fileName}`, 'utf-8');
    const proto = JSON.parse(jsonContent);

    console.log(proto.name)

    let sentencia = ''

    sentencia = 'create table ' + proto.name + '(id primary key,'

    proto.colums.forEach(function (columna,index) {
        sentencia += setFieldType(columna)
        index === proto.colums.length-1 ? sentencia+=');' : sentencia+=','
    })


    //console.log(sentencia)

    return sentencia

}