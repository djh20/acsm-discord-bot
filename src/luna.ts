import { readFile, writeFile, access, mkdir } from 'fs/promises';
import path from 'path';
import logger from './logger';

export class LunaDB {
  private loadedDocuments: Map<string, LunaDocument<any>> = new Map();
  private dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  public async load<Schema>(id: string, defaultData: Schema): Promise<LunaDocument<Schema>> {
    let doc: LunaDocument<Schema> | undefined = this.loadedDocuments.get(id);

    if (!doc) {
      logger.info(`LUNA: Reading document ${id}`);
      const docPath = this.getDocPath(id);
      const dataStr = await readFile(docPath, { encoding: 'utf8' }).catch(() => {});

      if (dataStr) {
        const data = JSON.parse(dataStr);
        doc = new LunaDocument(id, data);
      } else {
        doc = new LunaDocument(id, defaultData);
      }
    }
    
    doc.locks++;
    this.loadedDocuments.set(id, doc);
    logger.info(`LUNA: Loaded document ${id} [${doc.locks}L]`);
    return doc;
  }

  public async save(doc: LunaDocument<any>, autoRelease: boolean) {
    if (!doc.loaded) throw Error("Attempted to save unloaded document.");
    logger.info(`LUNA: Writing document ${doc.id}`);
    
    await access(this.dir).catch(async (err) => await mkdir(this.dir));
    
    const docPath = this.getDocPath(doc.id);
    const dataStr = JSON.stringify(doc.data);
    await writeFile(docPath, dataStr, { encoding: 'utf8' });
    if (autoRelease) this.release(doc);
    return undefined;
  }

  public release(doc: LunaDocument<any>) {
    doc.locks--;
    logger.info(`LUNA: Released document ${doc.id} [${doc.locks}L]`);
    if (doc.locks <= 0) {
      doc.loaded = false;
      this.loadedDocuments.delete(doc.id);
      logger.info(`LUNA: Unloaded document ${doc.id}`);
    }
  }

  private getDocPath(id: string) {
    return path.join(this.dir, `${id}.json`);
  }
}

export class LunaDocument<Schema> {
  public id: string;
  public data: Schema;
  public locks: number = 0;
  public loaded: boolean = true;

  constructor(id: string, data: Schema) {
    this.id = id;
    this.data = data;
  }
}
