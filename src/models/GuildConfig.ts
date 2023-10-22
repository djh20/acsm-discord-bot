import { Schema, model } from 'mongoose';

const schema = new Schema(
  {
    _id: String,
    acsm: {
      baseUrl: { type: String, required: true },
      auth: {
        type: {
          username: { type: String, required: true },
          password: { type: String, required: true },
          cookie: String
        },
        required: true
      }
    }
  },
  {
    methods: {
      async saveCookie(cookie: string) {
        if (!cookie) return;
        await this.updateOne({ 'acsm.auth.cookie': cookie });
      }
    }
  }
);

export const GuildConfig = model('GuildConfig', schema);
