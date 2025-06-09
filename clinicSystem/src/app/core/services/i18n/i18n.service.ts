import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { translation } from '../../../../assets/i18n/translation';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  currentLanguage: 'en' | 'ar' = 'en';
  translations: Record<string, any> | null = null;

  constructor(private httpClient: HttpClient) {}

  async loadTranslations(lang: 'en' | 'ar') {
    // لو نفس اللغة محملة، ارجع الترجمة
    if (this.translations && this.currentLanguage === lang) {
      return this.translations;
    }

    try {
      const translationsFile = `assets/i18n/${lang}.json`;
      // console.log(`Loading translations from: ${translationsFile}`);

      this.translations = await firstValueFrom(
        this.httpClient.get<Record<string, any>>(translationsFile)
      );

      // console.log('Loaded translations:', this.translations);

      this.currentLanguage = lang;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      return this.translations;
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      return null;
    }
  }

  setLanguage(language: 'en' | 'ar') {
    this.currentLanguage = language;
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  getLanguage() {
    return this.currentLanguage;
  }

  t(key: string): string {
    if (!this.translations) {
      return key; // لو الترجمة غير محملة ارجع المفتاح نفسه
    }

    const keys = key.split('.');
    let value: any = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined || value === null) {
        return key; // لو المفتاح غير موجود ارجع المفتاح نفسه
      }
    }

    return value;
  }
}
