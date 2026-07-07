'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/components/LanguageContext'
import { translations } from '@/components/translations'

type Category = 'قيم وأخلاق' | 'قصص إسلامية' | 'مغامرات واستكشاف' | 'أحلام وطموحات' | 'خيال وسحر' | 'آداب عامة' | 'أبطال' | 'أميرات'
type Gender   = 'all' | 'boy' | 'girl'

interface Story {
  id: number
  title: string
  titleEn: string
  gender: 'boy' | 'girl'
  category: Category
  categoryEn: string
  emoji: string
  bg: string
  desc: string
  descEn: string
  moral: string
  moralEn: string
  hasImage: boolean
}

const stories: Story[] = [
  // ══ قيم وأخلاق — ولد ══
  { id:1,  gender:'boy',  category:'قيم وأخلاق',           title:'الصدق ينجي',              emoji:'🤝', bg:'linear-gradient(135deg,#FF7A1A,#FFC72C)', desc:'طفلنا يتعلم إن الصدق حتى في أصعب المواقف هو الطريق الصح',           moral:'الصدق'          , titleEn:'Honesty Saves the Day', descEn:'Our child learns that honesty, even in the hardest situations, is always the right path', moralEn:'Honesty', categoryEn:'Values & Manners', hasImage:true },
  { id:2,  gender:'boy',  category:'قيم وأخلاق',           title:'شجاعة المختلف',           emoji:'💪', bg:'linear-gradient(135deg,#FF2D7A,#FF7A1A)', desc:'لما يكون مختلف عن باقي أصحابه يكتشف إن اختلافه هو قوته',            moral:'الثقة بالنفس'   , titleEn:'The Courage to Be Different', descEn:'When he feels different from his friends, he discovers that his difference is his strength', moralEn:'Self-Confidence', categoryEn:'Values & Manners', hasImage:true },
  { id:3,  gender:'boy',  category:'قيم وأخلاق',           title:'المشاركة تضاعف الفرح',   emoji:'🎁', bg:'linear-gradient(135deg,#27D3B6,#FFC72C)', desc:'يتعلم طفلنا إن مشاركة ما عنده بيضاعف السعادة لنفسه وللآخرين',      moral:'الكرم'          , titleEn:'Sharing Doubles the Joy', descEn:'Our child learns that sharing what he has multiplies happiness for himself and others', moralEn:'Generosity', categoryEn:'Values & Manners', hasImage:true },
  { id:4,  gender:'boy',  category:'قيم وأخلاق',           title:'الصبر مفتاح الفرج',      emoji:'⏳', bg:'linear-gradient(135deg,#7B3FF2,#27D3B6)', desc:'رحلة طفلنا مع الصبر لحين تحقيق حلمه الكبير',                       moral:'الصبر'          , titleEn:'Patience Opens the Way', descEn:'Our child\'s journey with patience until his big dream comes true', moralEn:'Patience', categoryEn:'Values & Manners', hasImage:true },
  { id:5,  gender:'boy',  category:'قيم وأخلاق',           title:'الأمانة كنز',             emoji:'🔑', bg:'linear-gradient(135deg,#FF7A1A,#7B3FF2)', desc:'يجد طفلنا كنزاً ثميناً ويواجه اختبار الأمانة الكبير',               moral:'الأمانة'        , titleEn:'Honesty Is a Treasure', descEn:'Our child finds a precious treasure and faces the big test of honesty', moralEn:'Trustworthiness', categoryEn:'Values & Manners', hasImage:true },
  { id:6,  gender:'boy',  category:'قيم وأخلاق',           title:'احترام الكبير',           emoji:'👴', bg:'linear-gradient(135deg,#12284C,#27D3B6)', desc:'مغامرة مع جده تعلّمه قيمة التجربة وحكمة الكبار',                   moral:'الاحترام'       , titleEn:'Respecting Elders', descEn:'An adventure with his grandfather teaches him the value of experience and the wisdom of elders', moralEn:'Respect', categoryEn:'Values & Manners', hasImage:true },
  // ══ قيم وأخلاق — بنت ══
  { id:7,  gender:'girl', category:'قيم وأخلاق',           title:'كلمة طيبة تزرع سعادة',  emoji:'🌸', bg:'linear-gradient(135deg,#FF2D7A,#FFC72C)', desc:'طفلتنا تكتشف كيف أن كلمة حلوة تغير يوم شخص بأكمله',               moral:'اللطف'          , titleEn:'A Kind Word Plants Happiness', descEn:'Our little girl discovers how one sweet word can change someone’s whole day', moralEn:'Kindness', categoryEn:'Values & Manners', hasImage:true },
  { id:8,  gender:'girl', category:'قيم وأخلاق',           title:'مشاعري تهم',              emoji:'💛', bg:'linear-gradient(135deg,#FFC72C,#FF7A1A)', desc:'تتعلم طفلتنا التعبير عن مشاعرها والتعامل مع الآخرين بتعاطف',       moral:'التعاطف'        , titleEn:'My Feelings Matter', descEn:'Our little girl learns to express her feelings and treat others with empathy', moralEn:'Empathy', categoryEn:'Values & Manners', hasImage:true },
  { id:9,  gender:'girl', category:'قيم وأخلاق',           title:'الحق يُقال',              emoji:'⚖️', bg:'linear-gradient(135deg,#7B3FF2,#FF2D7A)', desc:'موقف صعب يختبر شجاعة طفلتنا في قول الحق أمام الجميع',              moral:'العدل'          , titleEn:'The Truth Must Be Told', descEn:'A difficult situation tests our little girl\'s courage to speak the truth in front of everyone', moralEn:'Justice', categoryEn:'Values & Manners', hasImage:true },
  { id:10, gender:'girl', category:'قيم وأخلاق',           title:'صديقتي المختلفة',         emoji:'🤗', bg:'linear-gradient(135deg,#27D3B6,#7B3FF2)', desc:'تتعرف على صديقة جديدة مختلفة وتتعلم قبول الاختلاف وتقديره',        moral:'القبول'         , titleEn:'My Different Friend', descEn:'She meets a new, different friend and learns to accept and appreciate differences', moralEn:'Acceptance', categoryEn:'Values & Manners', hasImage:true },
  { id:11, gender:'girl', category:'قيم وأخلاق',           title:'الوعد أمانة',             emoji:'🌟', bg:'linear-gradient(135deg,#FF7A1A,#FFC72C)', desc:'طفلتنا تتعلم أن الوعد أمانة يجب الوفاء بها مهما كان الثمن',        moral:'الوفاء'         , titleEn:'A Promise Is a Trust', descEn:'Our little girl learns that a promise must be kept, no matter the cost', moralEn:'Loyalty', categoryEn:'Values & Manners', hasImage:true },
  { id:12, gender:'girl', category:'قيم وأخلاق',           title:'ترتيب الأولويات',         emoji:'📋', bg:'linear-gradient(135deg,#FF2D7A,#27D3B6)', desc:'تتعلم طفلتنا كيف تحدد أهم الأشياء وتنظم وقتها بشكل صحيح',          moral:'المسؤولية'      , titleEn:'Setting Priorities', descEn:'Our little girl learns how to identify what matters most and manage her time well', moralEn:'Responsibility', categoryEn:'Values & Manners', hasImage:true },
  // ══ قصص إسلامية — ولد ══
  { id:13, gender:'boy',  category:'قصص إسلامية',          title:'رفيق رمضان',              emoji:'🌙', bg:'linear-gradient(135deg,#12284C,#7B3FF2)', desc:'في رمضان المبارك يسافر طفلنا في رحلة روحانية مليئة بالتعلم',        moral:'الإيمان'        , titleEn:'Ramadan Companion', descEn:'During the blessed month of Ramadan, our child goes on a spiritual journey full of learning', moralEn:'Faith', categoryEn:'Islamic Stories', hasImage:true },
  { id:14, gender:'boy',  category:'قصص إسلامية',          title:'الدعاء يصل السماء',       emoji:'🤲', bg:'linear-gradient(135deg,#27D3B6,#12284C)', desc:'طفلنا يتعلم قوة الدعاء الصادق ويشهد معجزة الاستجابة',               moral:'التوكل على الله', titleEn:'Prayers Reach the Sky', descEn:'Our child learns the power of sincere prayer and witnesses the miracle of it being answered', moralEn:'Trust in God', categoryEn:'Islamic Stories', hasImage:true },
  { id:15, gender:'boy',  category:'قصص إسلامية',          title:'صحابة صغار',              emoji:'📿', bg:'linear-gradient(135deg,#7B3FF2,#FF7A1A)', desc:'مغامرة خيالية مع أبطال من صحابة النبي ﷺ وتعلم قيمهم',              moral:'حب النبي ﷺ'    , titleEn:'Little Companions', descEn:'An imaginative adventure with heroes from the Prophet\'s ر companions, learning their values', moralEn:'Love of the Prophet ر', categoryEn:'Islamic Stories', hasImage:true },
  { id:16, gender:'boy',  category:'قصص إسلامية',          title:'الجنة حلمي',              emoji:'🌿', bg:'linear-gradient(135deg,#27D3B6,#FFC72C)', desc:'يتخيل طفلنا الجنة ويتعلم الأعمال الصالحة التي تقربه منها',          moral:'العمل الصالح'  , titleEn:'Paradise Is My Dream', descEn:'Our child imagines Paradise and learns the good deeds that bring him closer to it', moralEn:'Good Deeds', categoryEn:'Islamic Stories', hasImage:true },
  { id:17, gender:'boy',  category:'قصص إسلامية',          title:'بر الوالدين',             emoji:'❤️', bg:'linear-gradient(135deg,#FF2D7A,#FF7A1A)', desc:'قصة جميلة عن بر الوالدين وكيف يفرح الله والملائكة بذلك',            moral:'بر الوالدين'   , titleEn:'Honoring Parents', descEn:'A beautiful story about honoring parents and how it pleases God and the angels', moralEn:'Honoring Parents', categoryEn:'Islamic Stories', hasImage:true },
  { id:18, gender:'boy',  category:'قصص إسلامية',          title:'حافظ القرآن الصغير',     emoji:'📖', bg:'linear-gradient(135deg,#12284C,#27D3B6)', desc:'رحلة طفلنا مع حفظ القرآن الكريم وما يشعر به من نور وسعادة',         moral:'حفظ القرآن'    , titleEn:'The Little Qur’an Keeper', descEn:'Our child\'s journey memorizing the Qur\'an and the light and joy he feels', moralEn:'Memorizing the Qur’an', categoryEn:'Islamic Stories', hasImage:true },
  // ══ قصص إسلامية — بنت ══
  { id:19, gender:'girl', category:'قصص إسلامية',          title:'فرحة العيد',              emoji:'🎊', bg:'linear-gradient(135deg,#FF2D7A,#FFC72C)', desc:'طفلتنا تستعد للعيد بفرح وتعلم معنى الشكر والعطاء',                 moral:'الشكر'          , titleEn:'The Joy of Eid', descEn:'Our little girl prepares for Eid with joy and learns the meaning of gratitude and giving', moralEn:'Gratitude', categoryEn:'Islamic Stories', hasImage:true },
  { id:20, gender:'girl', category:'قصص إسلامية',          title:'أمي جنتي',                emoji:'🌺', bg:'linear-gradient(135deg,#FF7A1A,#FF2D7A)', desc:'قصة مؤثرة عن حب الأم وبركة رضاها في حياة طفلتنا',                  moral:'بر الوالدين'   , titleEn:'My Mother, My Paradise', descEn:'A touching story about loving one’s mother and the blessing of her approval', moralEn:'Honoring Parents', categoryEn:'Islamic Stories', hasImage:true },
  { id:21, gender:'girl', category:'قصص إسلامية',          title:'ملاك الصدقة',             emoji:'💝', bg:'linear-gradient(135deg,#27D3B6,#FF2D7A)', desc:'طفلتنا تكتشف كيف تتضاعف الصدقة وتعود بالخير على صاحبها',           moral:'الصدقة'         , titleEn:'The Angel of Charity', descEn:'Our little girl discovers how charity multiplies and brings good back to the giver', moralEn:'Charity', categoryEn:'Islamic Stories', hasImage:true },
  { id:22, gender:'girl', category:'قصص إسلامية',          title:'حجابي تاجي',              emoji:'👑', bg:'linear-gradient(135deg,#7B3FF2,#FF2D7A)', desc:'قصة جميلة تجعل طفلتنا فخورة بحجابها ومعتزة بدينها',                moral:'العزة بالإيمان', titleEn:'My Hijab, My Crown', descEn:'A beautiful story that makes our little girl proud of her hijab and her faith', moralEn:'Pride in Faith', categoryEn:'Islamic Stories', hasImage:true },
  { id:23, gender:'girl', category:'قصص إسلامية',          title:'صلاتي نوري',              emoji:'✨', bg:'linear-gradient(135deg,#FFC72C,#27D3B6)', desc:'تتعلم طفلتنا أهمية الصلاة وكيف تنير حياتها وقلبها',                 moral:'الصلاة'         , titleEn:'My Prayer Is My Light', descEn:'Our little girl learns the importance of prayer and how it lights up her life and heart', moralEn:'Prayer', categoryEn:'Islamic Stories', hasImage:true },
  { id:24, gender:'girl', category:'قصص إسلامية',          title:'مريم البطلة',             emoji:'🌙', bg:'linear-gradient(135deg,#12284C,#7B3FF2)', desc:'مستوحاة من سيدة نساء العالمين — قصة صبر وإيمان وقوة',               moral:'الإيمان والصبر', titleEn:'Maryam the Heroine', descEn:'Inspired by the greatest woman in history — a story of patience, faith, and strength', moralEn:'Faith & Patience', categoryEn:'Islamic Stories', hasImage:true },
  // ══ مغامرات واستكشاف — ولد ══
  { id:25, gender:'boy',  category:'مغامرات واستكشاف',    title:'قبطان الغابة',            emoji:'🌿', bg:'linear-gradient(135deg,#27D3B6,#12284C)', desc:'طفلنا يقود مجموعته في غابة سحرية مليئة بالألغاز والمفاجآت',        moral:'القيادة'        , titleEn:'Captain of the Forest', descEn:'Our child leads his group through a magical forest full of puzzles and surprises', moralEn:'Leadership', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:26, gender:'boy',  category:'مغامرات واستكشاف',    title:'رحالة الصحراء',           emoji:'🏜️', bg:'linear-gradient(135deg,#FF7A1A,#FFC72C)', desc:'مغامرة ملحمية في الصحراء بحثاً عن كنز الأجداد المخفي',              moral:'الإصرار'        , titleEn:'Desert Wanderer', descEn:'An epic desert adventure in search of a hidden ancestral treasure', moralEn:'Determination', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:27, gender:'boy',  category:'مغامرات واستكشاف',    title:'بطل الأعماق',             emoji:'🌊', bg:'linear-gradient(135deg,#12284C,#27D3B6)', desc:'في أعماق البحر يكتشف طفلنا عالماً خفياً لم يره أحد من قبل',         moral:'الاستكشاف'      , titleEn:'Hero of the Deep', descEn:'Deep beneath the sea, our child discovers a hidden world no one has ever seen', moralEn:'Exploration', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:28, gender:'boy',  category:'مغامرات واستكشاف',    title:'رائد الجبال',             emoji:'🏔️', bg:'linear-gradient(135deg,#7B3FF2,#27D3B6)', desc:'يتسلق طفلنا أعلى جبل ويكتشف أن القمة تستحق كل التعب',              moral:'العزيمة'        , titleEn:'Mountain Pioneer', descEn:'Our child climbs the highest mountain and discovers the summit is worth every step', moralEn:'Perseverance', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:29, gender:'boy',  category:'مغامرات واستكشاف',    title:'مستكشف الكواكب',          emoji:'🪐', bg:'linear-gradient(135deg,#12284C,#7B3FF2)', desc:'رحلة فضائية خيالية لاكتشاف كواكب جديدة وحضارات مجهولة',             moral:'الفضول العلمي' , titleEn:'Planet Explorer', descEn:'An imaginative space journey to discover new planets and unknown civilizations', moralEn:'Scientific Curiosity', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:30, gender:'boy',  category:'مغامرات واستكشاف',    title:'محقق الأسرار',            emoji:'🔍', bg:'linear-gradient(135deg,#FF7A1A,#7B3FF2)', desc:'يحل طفلنا لغزاً غامضاً يحير الجميع بذكاء وملاحظة حادة',             moral:'الذكاء والمنطق', titleEn:'The Secret Detective', descEn:'Our child solves a mysterious puzzle that baffles everyone with sharp intelligence', moralEn:'Intelligence & Logic', categoryEn:'Adventure & Exploration', hasImage:true },
  // ══ مغامرات واستكشاف — بنت ══
  { id:31, gender:'girl', category:'مغامرات واستكشاف',    title:'مستكشفة الغابة السرية',  emoji:'🦋', bg:'linear-gradient(135deg,#27D3B6,#FF2D7A)', desc:'طفلتنا تدخل غابة سرية وتتوصل لاكتشاف علمي مذهل',                  moral:'حب العلم'       , titleEn:'Explorer of the Secret Forest', descEn:'Our little girl enters a secret forest and makes an amazing scientific discovery', moralEn:'Love of Science', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:32, gender:'girl', category:'مغامرات واستكشاف',    title:'قائدة البحر',             emoji:'⚓', bg:'linear-gradient(135deg,#FF2D7A,#12284C)', desc:'تقود طفلتنا سفينة في بحر متلاطم وتنجح في إنقاذ الجميع',             moral:'القيادة والشجاعة', titleEn:'Captain of the Sea', descEn:'Our little girl steers a ship through stormy seas and saves everyone on board', moralEn:'Leadership & Courage', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:33, gender:'girl', category:'مغامرات واستكشاف',    title:'رحلة إلى المجهول',        emoji:'🗺️', bg:'linear-gradient(135deg,#FFC72C,#27D3B6)', desc:'خريطة غامضة تقود طفلتنا في مغامرة لم تتخيلها في حياتها',            moral:'الجرأة'         , titleEn:'Journey Into the Unknown', descEn:'A mysterious map leads our little girl on an adventure beyond her wildest dreams', moralEn:'Boldness', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:34, gender:'girl', category:'مغامرات واستكشاف',    title:'الفلكية الصغيرة',         emoji:'🔭', bg:'linear-gradient(135deg,#12284C,#FF2D7A)', desc:'طفلتنا تكتشف نجماً جديداً وتثبت للعالم موهبتها العلمية',             moral:'الطموح العلمي' , titleEn:'The Little Astronomer', descEn:'Our little girl discovers a new star and proves her scientific talent to the world', moralEn:'Scientific Ambition', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:35, gender:'girl', category:'مغامرات واستكشاف',    title:'محققة الأحياء',           emoji:'🦎', bg:'linear-gradient(135deg,#27D3B6,#FFC72C)', desc:'رحلة في عالم الحيوانات لإنقاذ مخلوق نادر مهدد بالانقراض',          moral:'المحافظة على البيئة', titleEn:'The Wildlife Detective', descEn:'A journey into the animal world to save a rare creature threatened with extinction', moralEn:'Protecting the Environment', categoryEn:'Adventure & Exploration', hasImage:true },
  { id:36, gender:'girl', category:'مغامرات واستكشاف',    title:'بطلة الجبال',             emoji:'🏕️', bg:'linear-gradient(135deg,#7B3FF2,#FF7A1A)', desc:'تتسلق طفلتنا أشق القمم لتثبت أن البنات يستطعن كل شيء',              moral:'الإصرار والثقة', titleEn:'Heroine of the Mountains', descEn:'Our little girl climbs the toughest peaks to prove that girls can do anything', moralEn:'Determination & Confidence', categoryEn:'Adventure & Exploration', hasImage:true },
  // ══ أحلام وطموحات — ولد ══
  { id:37, gender:'boy',  category:'أحلام وطموحات',       title:'الطبيب الصغير',           emoji:'👨‍⚕️', bg:'linear-gradient(135deg,#27D3B6,#12284C)', desc:'حلم طفلنا بأن يصبح طبيباً يداوي الناس يبدأ بخطوة صغيرة',           moral:'الطموح'         , titleEn:'The Little Doctor', descEn:'Our child\'s dream of becoming a doctor who heals people begins with one small step', moralEn:'Ambition', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:38, gender:'boy',  category:'أحلام وطموحات',       title:'المهندس الصغير',          emoji:'🏗️', bg:'linear-gradient(135deg,#FF7A1A,#12284C)', desc:'طفلنا يبني برجاً خيالياً يلمس السحاب في مدينة المستقبل',             moral:'الإبداع والبناء', titleEn:'The Little Engineer', descEn:'Our child builds an imaginary tower reaching the clouds in the city of the future', moralEn:'Creativity & Building', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:39, gender:'boy',  category:'أحلام وطموحات',       title:'بطل الملعب',              emoji:'⚽', bg:'linear-gradient(135deg,#27D3B6,#FF7A1A)', desc:'يحقق طفلنا حلمه في الملعب بعد تدريب ومثابرة لا تتوقف',              moral:'المثابرة'       , titleEn:'Hero of the Field', descEn:'Our child achieves his dream on the field after nonstop training and perseverance', moralEn:'Perseverance', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:40, gender:'boy',  category:'أحلام وطموحات',       title:'المخترع العبقري',         emoji:'💡', bg:'linear-gradient(135deg,#FFC72C,#7B3FF2)', desc:'فكرة صغيرة في رأس طفلنا تتحول لاختراع يغير العالم',                 moral:'الإبداع'        , titleEn:'The Brilliant Inventor', descEn:'A small idea in our child\'s mind turns into an invention that changes the world', moralEn:'Creativity', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:41, gender:'boy',  category:'أحلام وطموحات',       title:'قائد الغد',               emoji:'🎖️', bg:'linear-gradient(135deg,#7B3FF2,#12284C)', desc:'طفلنا يحلم بقيادة بلده يوماً وينمو ليكون مستعداً لذلك',             moral:'القيادة'        , titleEn:'Leader of Tomorrow', descEn:'Our child dreams of leading his country one day and grows to be ready for it', moralEn:'Leadership', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:42, gender:'boy',  category:'أحلام وطموحات',       title:'رسام الكون',              emoji:'🎨', bg:'linear-gradient(135deg,#FF2D7A,#7B3FF2)', desc:'موهبة الرسم عند طفلنا تحوّل أحلامه إلى لوحات تحكي قصصاً',          moral:'الموهبة'        , titleEn:'Painter of the Universe', descEn:'Our child\'s talent for drawing turns his dreams into paintings that tell stories', moralEn:'Talent', categoryEn:'Dreams & Ambitions', hasImage:true },
  // ══ أحلام وطموحات — بنت ══
  { id:43, gender:'girl', category:'أحلام وطموحات',       title:'الطبيبة الصغيرة',         emoji:'👩‍⚕️', bg:'linear-gradient(135deg,#FF2D7A,#27D3B6)', desc:'طفلتنا تحلم بإنقاذ الأرواح وتبدأ رحلتها الطبية من الصغر',          moral:'التضحية'        , titleEn:'The Little Doctor Girl', descEn:'Our little girl dreams of saving lives and begins her medical journey early', moralEn:'Sacrifice', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:44, gender:'girl', category:'أحلام وطموحات',       title:'المعلمة المحبوبة',        emoji:'📚', bg:'linear-gradient(135deg,#FFC72C,#FF2D7A)', desc:'طفلتنا تحلم بتعليم كل أطفال العالم وتبدأ بفصلها الخاص',             moral:'العلم والتعليم', titleEn:'The Beloved Teacher', descEn:'Our little girl dreams of teaching every child in the world, starting with her own classroom', moralEn:'Knowledge & Teaching', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:45, gender:'girl', category:'أحلام وطموحات',       title:'مصممة الأزياء',           emoji:'👗', bg:'linear-gradient(135deg,#7B3FF2,#FF2D7A)', desc:'إبداع طفلتنا يتحول إلى أزياء تبهر العالم وتحكي قصصاً',              moral:'الإبداع'        , titleEn:'The Fashion Designer', descEn:'Our little girl\'s creativity turns into fashion that amazes the world and tells stories', moralEn:'Creativity', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:46, gender:'girl', category:'أحلام وطموحات',       title:'صانعة السينما',           emoji:'🎬', bg:'linear-gradient(135deg,#FF7A1A,#7B3FF2)', desc:'طفلتنا تحكي قصتها للعالم عبر الصورة والموسيقى والفن',               moral:'التعبير الإبداعي', titleEn:'The Filmmaker', descEn:'Our little girl tells her story to the world through image, music, and art', moralEn:'Creative Expression', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:47, gender:'girl', category:'أحلام وطموحات',       title:'العالِمة الصغيرة',        emoji:'🔬', bg:'linear-gradient(135deg,#27D3B6,#7B3FF2)', desc:'طفلتنا تكتشف علاجاً لمرض يؤلم كثيراً من حولها',                    moral:'العلم للإنسان' , titleEn:'The Little Scientist', descEn:'Our little girl discovers a cure for an illness that has hurt many around her', moralEn:'Science for Humanity', categoryEn:'Dreams & Ambitions', hasImage:true },
  { id:48, gender:'girl', category:'أحلام وطموحات',       title:'موسيقية القلوب',          emoji:'🎵', bg:'linear-gradient(135deg,#FF2D7A,#FFC72C)', desc:'موسيقى طفلتنا تداوي القلوب الحزينة وتجمع الناس بعضهم ببعض',        moral:'فن التعبير'     , titleEn:'Musician of Hearts', descEn:'Our little girl\'s music heals sad hearts and brings people together', moralEn:'Art of Expression', categoryEn:'Dreams & Ambitions', hasImage:true },
  // ══ خيال وسحر — ولد ══
  { id:49, gender:'boy',  category:'خيال وسحر',           title:'ساحر الكلمات',            emoji:'📜', bg:'linear-gradient(135deg,#7B3FF2,#FF2D7A)', desc:'يكتشف طفلنا أن الكلمات لها قوة سحرية تغير الواقع',                  moral:'قوة الكلمة'    , titleEn:'The Wizard of Words', descEn:'Our child discovers that words hold a magical power that can change reality', moralEn:'The Power of Words', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:50, gender:'boy',  category:'خيال وسحر',           title:'حارس المملكة السحرية',    emoji:'🏰', bg:'linear-gradient(135deg,#12284C,#FF2D7A)', desc:'طفلنا يُختار ليكون حارساً لمملكة سحرية مهددة بالظلام',              moral:'الشجاعة'        , titleEn:'Guardian of the Magic Kingdom', descEn:'Our child is chosen to guard a magical kingdom threatened by darkness', moralEn:'Courage', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:51, gender:'boy',  category:'خيال وسحر',           title:'التنين الصديق',           emoji:'🐉', bg:'linear-gradient(135deg,#7B3FF2,#27D3B6)', desc:'يصادق طفلنا تنيناً خجولاً ليثبت أن المظهر لا يعبر عن الجوهر',      moral:'عدم الحكم بالمظهر', titleEn:'The Friendly Dragon', descEn:'Our child befriends a shy dragon, proving that looks don\'t reflect the heart', moralEn:'Don’t Judge by Appearance', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:52, gender:'boy',  category:'خيال وسحر',           title:'مملكة تحت البحر',         emoji:'🧜', bg:'linear-gradient(135deg,#27D3B6,#7B3FF2)', desc:'طفلنا يغوص ليجد مملكة سحرية تحت الأمواج تنتظره',                   moral:'الاستكشاف'      , titleEn:'Kingdom Beneath the Sea', descEn:'Our child dives down to find a magical kingdom waiting beneath the waves', moralEn:'Exploration', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:53, gender:'boy',  category:'خيال وسحر',           title:'المدينة الطائرة',         emoji:'☁️', bg:'linear-gradient(135deg,#FFC72C,#7B3FF2)', desc:'طفلنا يكتشف مدينة فوق الغيوم بقواعدها ومدنيتها الخاصة',            moral:'الخيال'         , titleEn:'The Flying City', descEn:'Our child discovers a city above the clouds with its own rules and wonders', moralEn:'Imagination', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:54, gender:'boy',  category:'خيال وسحر',           title:'آلة الزمن',               emoji:'⏰', bg:'linear-gradient(135deg,#FF7A1A,#12284C)', desc:'يسافر طفلنا عبر الزمن ويتعلم من التاريخ ليبني مستقبلاً أفضل',      moral:'تعلم من الماضي', titleEn:'The Time Machine', descEn:'Our child travels through time, learning from history to build a better future', moralEn:'Learning from the Past', categoryEn:'Fantasy & Magic', hasImage:true },
  // ══ خيال وسحر — بنت ══
  { id:55, gender:'girl', category:'خيال وسحر',           title:'ساحرة النور',             emoji:'🌟', bg:'linear-gradient(135deg,#FF2D7A,#FFC72C)', desc:'طفلتنا تمتلك قوة النور وتستخدمها لمحو الظلام من العالم',            moral:'الخير يغلب الشر', titleEn:'The Sorceress of Light', descEn:'Our little girl holds the power of light and uses it to banish darkness from the world', moralEn:'Good Overcomes Evil', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:56, gender:'girl', category:'خيال وسحر',           title:'حديقة السحر',             emoji:'🌈', bg:'linear-gradient(135deg,#27D3B6,#FF2D7A)', desc:'طفلتنا تكتشف حديقة سحرية تنمو كلما نثرت فيها الكلمات الجميلة',    moral:'الإيجابية'      , titleEn:'The Garden of Magic', descEn:'Our little girl discovers a magical garden that grows whenever she speaks kind words', moralEn:'Positivity', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:57, gender:'girl', category:'خيال وسحر',           title:'فراشة الأحلام',           emoji:'🦋', bg:'linear-gradient(135deg,#7B3FF2,#FFC72C)', desc:'في عالم الأحلام تلتقي طفلتنا بكل أصدقاء الخيال',                   moral:'الخيال نعمة'   , titleEn:'Butterfly of Dreams', descEn:'In the world of dreams, our little girl meets all her imaginary friends', moralEn:'Imagination Is a Gift', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:58, gender:'girl', category:'خيال وسحر',           title:'ملكة الأمواج',            emoji:'🌊', bg:'linear-gradient(135deg,#27D3B6,#12284C)', desc:'طفلتنا ترث قدرة التحكم في البحر وتستخدمها لمساعدة الناس',           moral:'القوة بالخير'  , titleEn:'Queen of the Waves', descEn:'Our little girl inherits the power to control the sea and uses it to help others', moralEn:'Strength for Good', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:59, gender:'girl', category:'خيال وسحر',           title:'بنت الغيوم',              emoji:'☁️', bg:'linear-gradient(135deg,#FFC72C,#FF2D7A)', desc:'طفلتنا ترسم على الغيوم لوحات تُفرح كل من ينظر إليها',               moral:'الجمال'         , titleEn:'The Cloud Girl', descEn:'Our little girl paints on the clouds, creating scenes that bring joy to everyone who sees them', moralEn:'Beauty', categoryEn:'Fantasy & Magic', hasImage:true },
  { id:60, gender:'girl', category:'خيال وسحر',           title:'أميرة القصص',             emoji:'📖', bg:'linear-gradient(135deg,#FF2D7A,#7B3FF2)', desc:'كل قصة تقرأها طفلتنا تتحول إلى واقع سحري تعيشه بنفسها',            moral:'قوة القراءة'   , titleEn:'Princess of Stories', descEn:'Every story our little girl reads turns into a magical reality she gets to live', moralEn:'The Power of Reading', categoryEn:'Fantasy & Magic', hasImage:true },
  // ══ آداب عامة ══
  { id:61, gender:'boy', category:'آداب عامة', title:'بطل الطابور', emoji:'🚶', bg:'linear-gradient(135deg,#12284C,#1E3A6E)', desc:'طفلنا يتعلم قيمة الانتظار في الطابور باحترام وصبر مع أصدقائه', moral:'النظام والصبر', titleEn:'Hero of the Line', descEn:'Our child learns the value of waiting patiently and respectfully in line with his friends', moralEn:'Order & Patience', categoryEn:'Good Manners', hasImage:true },
  { id:62, gender:'girl', category:'آداب عامة', title:'الكلمة الطيبة', emoji:'💬', bg:'linear-gradient(135deg,#1E3A6E,#27D3B6)', desc:'طفلتنا تكتشف كيف كلمة طيبة واحدة ممكن تغير يوم حد كامل', moral:'اللطف', titleEn:'The Kind Word', descEn:'Our little girl discovers how one kind word can change someone’s entire day', moralEn:'Kindness', categoryEn:'Good Manners', hasImage:true },
  { id:63, gender:'boy', category:'آداب عامة', title:'شكرًا... تصنع السعادة', emoji:'🙏', bg:'linear-gradient(135deg,#12284C,#FFC72C)', desc:'طفلنا يتعلم إن كلمة شكرًا الصغيرة بتنشر سعادة كبيرة حواليه', moral:'الامتنان', titleEn:'Thank You... Creates Happiness', descEn:'Our child learns that one small \'thank you\' spreads great happiness around him', moralEn:'Gratitude', categoryEn:'Good Manners', hasImage:true },
  { id:64, gender:'girl', category:'آداب عامة', title:'أستأذن أولًا', emoji:'🤲', bg:'linear-gradient(135deg,#1E3A6E,#7B3FF2)', desc:'طفلتنا تتعلم أدب الاستئذان قبل أخذ أي حاجة من حد', moral:'الاحترام', titleEn:'I Ask First', descEn:'Our little girl learns the manners of asking permission before taking anything from someone', moralEn:'Respect', categoryEn:'Good Manners', hasImage:true },
  { id:65, gender:'boy', category:'آداب عامة', title:'البطل الذي يساعد الجميع', emoji:'🤝', bg:'linear-gradient(135deg,#12284C,#27D3B6)', desc:'طفلنا يكتشف إن مساعدة الآخرين بتخليه بطل حقيقي في عيون الجميع', moral:'التعاون', titleEn:'The Hero Who Helps Everyone', descEn:'Our child discovers that helping others makes him a true hero in everyone\'s eyes', moralEn:'Cooperation', categoryEn:'Good Manners', hasImage:true },
  { id:66, gender:'boy', category:'آداب عامة', title:'بطل الحديقة النظيفة', emoji:'🌳', bg:'linear-gradient(135deg,#27D3B6,#12284C)', desc:'طفلنا يقود حملة للحفاظ على نظافة الحديقة ويصبح قدوة لأصحابه', moral:'حب البيئة', titleEn:'Hero of the Clean Park', descEn:'Our child leads a campaign to keep the park clean and becomes a role model for his friends', moralEn:'Caring for the Environment', categoryEn:'Good Manners', hasImage:true },
  { id:67, gender:'girl', category:'آداب عامة', title:'الفصل النظيف', emoji:'🧹', bg:'linear-gradient(135deg,#1E3A6E,#FFC72C)', desc:'طفلتنا تتعلم أهمية النظام والنظافة في فصلها مع زميلاتها', moral:'النظام', titleEn:'The Tidy Classroom', descEn:'Our little girl learns the importance of order and cleanliness in her classroom with her friends', moralEn:'Order', categoryEn:'Good Manners', hasImage:true },
  { id:68, gender:'girl', category:'آداب عامة', title:'لا للتنمر... نعم للصداقة', emoji:'🚫', bg:'linear-gradient(135deg,#12284C,#FF2D7A)', desc:'طفلتنا تقف في وجه التنمر وتنشر روح الصداقة بين زميلاتها', moral:'رفض التنمر', titleEn:'No to Bullying... Yes to Friendship', descEn:'Our little girl stands up against bullying and spreads friendship among her classmates', moralEn:'Rejecting Bullying', categoryEn:'Good Manners', hasImage:true },
  { id:69, gender:'boy', category:'آداب عامة', title:'آداب تناول الطعام', emoji:'🍽️', bg:'linear-gradient(135deg,#1E3A6E,#FF7A1A)', desc:'طفلنا يتعلم آداب المائدة الصحيحة ويطبقها بفخر أمام أسرته', moral:'آداب الطعام', titleEn:'Table Manners', descEn:'Our child learns proper table manners and proudly practices them in front of his family', moralEn:'Table Manners', categoryEn:'Good Manners', hasImage:true },
  { id:70, gender:'boy', category:'آداب عامة', title:'السلام بداية الصداقة', emoji:'👋', bg:'linear-gradient(135deg,#12284C,#27D3B6)', desc:'طفلنا يكتشف إن كلمة السلام هي أول خطوة لصداقة جميلة', moral:'حسن الاستقبال', titleEn:'Greeting Starts Friendship', descEn:'Our child discovers that a simple greeting is the first step to a beautiful friendship', moralEn:'Warm Welcome', categoryEn:'Good Manners', hasImage:true },
  { id:71, gender:'girl', category:'آداب عامة', title:'غرفتي مسؤوليتي', emoji:'🛏️', bg:'linear-gradient(135deg,#1E3A6E,#FF2D7A)', desc:'طفلتنا تتحمل مسؤولية ترتيب غرفتها وتفخر بنظامها الجديد', moral:'المسؤولية', titleEn:'My Room, My Responsibility', descEn:'Our little girl takes responsibility for tidying her room and is proud of her new order', moralEn:'Responsibility', categoryEn:'Good Manners', hasImage:true },
  { id:72, gender:'boy', category:'آداب عامة', title:'الاستئذان قبل الدخول', emoji:'🚪', bg:'linear-gradient(135deg,#12284C,#7B3FF2)', desc:'طفلنا يتعلم أدب طرق الباب والاستئذان قبل دخول أي غرفة', moral:'الاحترام', titleEn:'Knock Before You Enter', descEn:'Our child learns the manners of knocking and asking permission before entering any room', moralEn:'Respect', categoryEn:'Good Manners', hasImage:true },
  { id:73, gender:'girl', category:'آداب عامة', title:'أحافظ على أدواتي', emoji:'🎒', bg:'linear-gradient(135deg,#1E3A6E,#FFC72C)', desc:'طفلتنا تتعلم قيمة المحافظة على أدواتها وألعابها بحرص', moral:'المحافظة على الممتلكات', titleEn:'I Take Care of My Things', descEn:'Our little girl learns the value of taking care of her tools and toys', moralEn:'Caring for Belongings', categoryEn:'Good Manners', hasImage:true },
  { id:74, gender:'boy', category:'آداب عامة', title:'أساعد زملائي', emoji:'🧑‍🤝‍🧑', bg:'linear-gradient(135deg,#12284C,#27D3B6)', desc:'طفلنا يمد يد العون لزميله في الفصل ويكتشف فرحة العطاء', moral:'التعاون', titleEn:'I Help My Classmates', descEn:'Our child lends a helping hand to his classmate and discovers the joy of giving', moralEn:'Cooperation', categoryEn:'Good Manners', hasImage:true },
  { id:75, gender:'girl', category:'آداب عامة', title:'كلمة سحرية اسمها من فضلك', emoji:'✨', bg:'linear-gradient(135deg,#1E3A6E,#FF2D7A)', desc:'طفلتنا تكتشف السحر الحقيقي في كلمة من فضلك مع كل طلب', moral:'حسن الطلب', titleEn:'A Magic Word Called Please', descEn:'Our little girl discovers the real magic in the word "please" with every request', moralEn:'Polite Requests', categoryEn:'Good Manners', hasImage:true },
  // ══ أبطال ══
  { id:76, gender:'boy', category:'أبطال', title:'البطل الخارق الشجاع', emoji:'🦸', bg:'linear-gradient(135deg,#E4572E,#FF7A1A)', desc:'طفلنا يكتشف بطولته الحقيقية في موقف يحتاج شجاعة نادرة', moral:'الشجاعة', titleEn:'The Brave Superhero', descEn:'Our child discovers his true heroism in a moment that calls for rare courage', moralEn:'Courage', categoryEn:'Heroes', hasImage:true },
  { id:77, gender:'boy', category:'أبطال', title:'قوة القلب الطيب', emoji:'💖', bg:'linear-gradient(135deg,#E4572E,#FF2D7A)', desc:'طفلنا يتعلم إن أقوى سلاح هو القلب الطيب مش القوة', moral:'الطيبة قوة', titleEn:'The Power of a Kind Heart', descEn:'Our child learns that the strongest weapon is a kind heart, not physical strength', moralEn:'Kindness Is Strength', categoryEn:'Heroes', hasImage:true },
  { id:78, gender:'boy', category:'أبطال', title:'بطل لا يستسلم', emoji:'🏆', bg:'linear-gradient(135deg,#E4572E,#FFC72C)', desc:'طفلنا يواجه تحدي صعب ويتعلم إن الأبطال الحقيقيين ما بيستسلموش', moral:'المثابرة', titleEn:'A Hero Who Never Gives Up', descEn:'Our child faces a tough challenge and learns that true heroes never give up', moralEn:'Perseverance', categoryEn:'Heroes', hasImage:true },
  { id:79, gender:'boy', category:'أبطال', title:'درع الشجاعة', emoji:'🛡️', bg:'linear-gradient(135deg,#E4572E,#12284C)', desc:'طفلنا يحمل درع الشجاعة ليحمي من حوله في مغامرة مثيرة', moral:'الشجاعة', titleEn:'The Shield of Courage', descEn:'Our child carries the shield of courage to protect those around him in an exciting adventure', moralEn:'Courage', categoryEn:'Heroes', hasImage:true },
  { id:80, gender:'boy', category:'أبطال', title:'مهمة إنقاذ المدينة', emoji:'🏙️', bg:'linear-gradient(135deg,#E4572E,#7B3FF2)', desc:'طفلنا في مهمة خطيرة لإنقاذ مدينته بالذكاء والشجاعة', moral:'التضحية', titleEn:'Mission to Save the City', descEn:'Our child is on a dangerous mission to save his city with intelligence and courage', moralEn:'Sacrifice', categoryEn:'Heroes', hasImage:true },
  { id:81, gender:'boy', category:'أبطال', title:'البطل الذي هزم الخوف', emoji:'😤', bg:'linear-gradient(135deg,#E4572E,#27D3B6)', desc:'طفلنا يواجه أكبر مخاوفه ويكتشف إنه أقوى مما يتخيل', moral:'مواجهة الخوف', titleEn:'The Hero Who Defeated Fear', descEn:'Our child faces his biggest fears and discovers he\'s stronger than he imagined', moralEn:'Facing Fear', categoryEn:'Heroes', hasImage:true },
  { id:82, gender:'boy', category:'أبطال', title:'قوة الإرادة الخارقة', emoji:'⚡', bg:'linear-gradient(135deg,#E4572E,#FFC72C)', desc:'طفلنا يحقق المستحيل بإرادته القوية وإصراره على النجاح', moral:'قوة الإرادة', titleEn:'The Power of Superhuman Will', descEn:'Our child achieves the impossible through strong will and determination to succeed', moralEn:'Willpower', categoryEn:'Heroes', hasImage:true },
  { id:83, gender:'boy', category:'أبطال', title:'البطل الصغير في مواجهة التنمر', emoji:'🦸‍♂️', bg:'linear-gradient(135deg,#E4572E,#FF2D7A)', desc:'طفلنا يقف بشجاعة في وجه التنمر ويدافع عن نفسه وأصحابه', moral:'الشجاعة في الدفاع عن النفس', titleEn:'The Little Hero Against Bullying', descEn:'Our child bravely stands up to bullying and defends himself and his friends', moralEn:'Courage to Stand Up', categoryEn:'Heroes', hasImage:true },
  // ══ أميرات ══
  { id:84, gender:'girl', category:'أميرات', title:'أميرة الأحلام', emoji:'👑', bg:'linear-gradient(135deg,#D6336C,#7B3FF2)', desc:'طفلتنا أميرة تسافر في عالم الأحلام لتحقق أمنيتها الغالية', moral:'تحقيق الأحلام', titleEn:'Princess of Dreams', descEn:'Our little princess travels through the world of dreams to fulfill her dearest wish', moralEn:'Chasing Dreams', categoryEn:'Princesses', hasImage:true },
  { id:85, gender:'girl', category:'أميرات', title:'أميرة اليونيكورن', emoji:'🦄', bg:'linear-gradient(135deg,#D6336C,#27D3B6)', desc:'طفلتنا تصادق يونيكورن سحري في مغامرة مليئة بالألوان والسحر', moral:'الخيال', titleEn:'Unicorn Princess', descEn:'Our little princess befriends a magical unicorn on a colorful, enchanted adventure', moralEn:'Imagination', categoryEn:'Princesses', hasImage:true },
  { id:86, gender:'girl', category:'أميرات', title:'أميرة الفراشات', emoji:'🦋', bg:'linear-gradient(135deg,#D6336C,#FFC72C)', desc:'طفلتنا أميرة تحكم مملكة الفراشات الملونة بقلب طيب وحنون', moral:'الجمال الداخلي', titleEn:'Princess of the Butterflies', descEn:'Our little princess rules the colorful kingdom of butterflies with a kind, gentle heart', moralEn:'Inner Beauty', categoryEn:'Princesses', hasImage:true },
  { id:87, gender:'girl', category:'أميرات', title:'أميرة الزهور', emoji:'🌸', bg:'linear-gradient(135deg,#D6336C,#FF7A1A)', desc:'طفلتنا أميرة تنشر الجمال في مملكتها بحديقة ورد سحرية', moral:'العطاء', titleEn:'Princess of the Flowers', descEn:'Our little princess spreads beauty across her kingdom in a magical rose garden', moralEn:'Giving', categoryEn:'Princesses', hasImage:true },
  { id:88, gender:'girl', category:'أميرات', title:'أميرة القمر', emoji:'🌙', bg:'linear-gradient(135deg,#D6336C,#12284C)', desc:'طفلتنا أميرة تحرس نور القمر وتضيء الليل لكل الأطفال', moral:'الحلم', titleEn:'Princess of the Moon', descEn:'Our little princess guards the moonlight and lights up the night for every child', moralEn:'Dreaming', categoryEn:'Princesses', hasImage:true },
  { id:89, gender:'girl', category:'أميرات', title:'أميرة النجوم', emoji:'⭐', bg:'linear-gradient(135deg,#D6336C,#FFC72C)', desc:'طفلتنا أميرة تجمع النجوم المتناثرة وتعيدها لسماء مملكتها', moral:'الطموح', titleEn:'Princess of the Stars', descEn:'Our little princess gathers scattered stars and returns them to her kingdom\'s sky', moralEn:'Ambition', categoryEn:'Princesses', hasImage:true },
  { id:90, gender:'girl', category:'أميرات', title:'أميرة الكريستال', emoji:'💎', bg:'linear-gradient(135deg,#D6336C,#27D3B6)', desc:'طفلتنا أميرة تحمي قصر الكريستال الساحر من قوى الظلام', moral:'النقاء', titleEn:'Crystal Princess', descEn:'Our little princess protects the enchanted crystal palace from the forces of darkness', moralEn:'Purity', categoryEn:'Princesses', hasImage:true },
  { id:91, gender:'girl', category:'أميرات', title:'الأميرة والقلعة السرية', emoji:'🏰', bg:'linear-gradient(135deg,#D6336C,#12284C)', desc:'طفلتنا أميرة تكتشف قلعة سرية مخبأة تحمل أسرار مملكتها', moral:'الشجاعة والاكتشاف', titleEn:'The Princess and the Secret Castle', descEn:'Our little princess discovers a hidden castle holding the secrets of her kingdom', moralEn:'Courage & Discovery', categoryEn:'Princesses', hasImage:true },
  { id:92, gender:'girl', category:'أميرات', title:'أميرة البحر', emoji:'🧜‍♀️', bg:'linear-gradient(135deg,#D6336C,#27D3B6)', desc:'طفلتنا أميرة تحكم مملكة تحت الأمواج وتنقذ أصدقاءها البحريين', moral:'الشجاعة', titleEn:'Princess of the Sea', descEn:'Our little princess rules an underwater kingdom and rescues her ocean friends', moralEn:'Courage', categoryEn:'Princesses', hasImage:true },
  { id:93, gender:'girl', category:'أميرات', title:'أميرة مدينة الأحلام', emoji:'🌆', bg:'linear-gradient(135deg,#D6336C,#FF7A1A)', desc:'طفلتنا أميرة تبني مدينة أحلامها بالخيال والإبداع والحب', moral:'الأمل والإبداع', titleEn:'Princess of Dream City', descEn:'Our little princess builds her dream city with imagination, creativity, and love', moralEn:'Hope & Creativity', categoryEn:'Princesses', hasImage:true },
  { id:94, gender:'girl', category:'أميرات', title:'مدينة الأحلام الوردية', emoji:'🌷', bg:'linear-gradient(135deg,#D6336C,#FF2D7A)', desc:'طفلتنا أميرة تنشر الفرح والتفاؤل في مدينتها الوردية الساحرة', moral:'التفاؤل', titleEn:'The Pink Dream City', descEn:'Our little princess spreads joy and optimism throughout her pink, magical city', moralEn:'Optimism', categoryEn:'Princesses', hasImage:true },
]

const categories: Category[] = ['قيم وأخلاق','قصص إسلامية','مغامرات واستكشاف','أحلام وطموحات','خيال وسحر','آداب عامة','أبطال','أميرات']

const catMeta: Record<Category,{icon:string;color:string;bg:string}> = {
  'قيم وأخلاق':        {icon:'🤝',color:'var(--orange)', bg:'#FFF3EA'},
  'قصص إسلامية':       {icon:'🌙',color:'var(--teal)',   bg:'var(--teal-soft)'},
  'مغامرات واستكشاف': {icon:'🗺️',color:'var(--purple)', bg:'var(--purple-soft)'},
  'أحلام وطموحات':     {icon:'⭐',color:'#D4A000',       bg:'var(--yellow-soft)'},
  'خيال وسحر':         {icon:'✨',color:'var(--pink)',   bg:'var(--pink-soft)'},
  'آداب عامة':          {icon:'🎓',color:'#12284C',       bg:'#EAF0F7'},
  'أبطال':              {icon:'🦸',color:'#E4572E',       bg:'#FDEEE9'},
  'أميرات':             {icon:'👑',color:'#D6336C',       bg:'#FDEEF3'},
}

const categoryEnMap: Record<Category,string> = {
  'قيم وأخلاق':'Values & Manners',
  'قصص إسلامية':'Islamic Stories',
  'مغامرات واستكشاف':'Adventure & Exploration',
  'أحلام وطموحات':'Dreams & Ambitions',
  'خيال وسحر':'Fantasy & Magic',
  'آداب عامة':'Good Manners',
  'أبطال':'Heroes',
  'أميرات':'Princesses',
}

/* ── Smart cover: shows real image if exists, falls back to gradient placeholder ── */
function StoryCover({ story, hasImage, lang, comingSoonLabel }: { story: Story; hasImage: boolean; lang: 'en'|'ar'; comingSoonLabel: string }) {
  const displayTitle = lang === 'en' ? story.titleEn : story.title
  const displayMoral = lang === 'en' ? story.moralEn : story.moral
  const genderLabel = story.gender === 'boy'
    ? (lang === 'en' ? '👦 Boy' : '👦 ولد')
    : (lang === 'en' ? '👧 Girl' : '👧 بنت')
  if (hasImage) {
    return (
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '3 / 4',
          background: 'linear-gradient(135deg, #f5f5f5, #e8e8e8)',
        }}
      >
        <Image
          src={`/stories/story-${story.id}.png`}
          alt={displayTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'center center',
          }}
        />
        {/* strong gradient at bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)',
          }}
        />
        {/* gender badge — top right */}
        <div
          className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(0,0,0,0.45)',
            color: 'white',
            fontFamily: 'var(--font-body)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {genderLabel}
        </div>
        {/* title + moral — bottom */}
        <div className="absolute bottom-0 right-0 left-0 p-4">
          <div
            className="font-tajawal font-black text-lg text-white leading-tight mb-2"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)',
              letterSpacing: '0.3px',
            }}
          >
            {displayTitle}
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded-full inline-block font-bold"
            style={{
              background: 'rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.95)',
              fontFamily: 'var(--font-body)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.3)',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            {displayMoral}
          </div>
        </div>
      </div>
    )
  }

  /* ── Placeholder cover ── */
  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ aspectRatio: '3 / 4', background: story.bg }}>
      {/* shine */}
      <div className="absolute inset-0 opacity-20"
        style={{background:'radial-gradient(circle at 25% 25%, white, transparent 55%)'}}/>

      {/* strong bottom gradient */}
      <div
        className="absolute inset-0"
        style={{ background:'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 75%)' }}
      />

      {/* Book shape SVG */}
      <div className="relative z-10 mb-1">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6"  y="14" width="28" height="44" rx="4" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          <rect x="38" y="14" width="28" height="44" rx="4" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <rect x="33" y="14" width="6" height="44" rx="2" fill="rgba(255,255,255,0.35)"/>
          <rect x="12" y="26" width="16" height="2.5" rx="1.25" fill="rgba(255,255,255,0.5)"/>
          <rect x="12" y="32" width="12" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)"/>
          <rect x="12" y="38" width="14" height="2.5" rx="1.25" fill="rgba(255,255,255,0.35)"/>
          <rect x="12" y="44" width="10" height="2.5" rx="1.25" fill="rgba(255,255,255,0.25)"/>
          <circle cx="52" cy="36" r="14" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <text x="52" y="42" textAnchor="middle" fontSize="16">{story.emoji}</text>
        </svg>
      </div>

      {/* gender badge */}
      <div className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full"
        style={{background:'rgba(0,0,0,0.35)',color:'white',fontFamily:'var(--font-body)',backdropFilter:'blur(6px)',border:'1px solid rgba(255,255,255,0.2)'}}>
        {genderLabel}
      </div>

      {/* title + moral at bottom */}
      <div className="absolute bottom-0 right-0 left-0 p-3 z-10">
        <div
          className="font-tajawal font-black text-base text-white leading-tight mb-1.5"
          style={{ textShadow:'0 2px 8px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,1)' }}
        >
          {displayTitle}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-bold inline-block"
            style={{background:'rgba(255,255,255,0.18)',color:'white',fontFamily:'var(--font-body)',backdropFilter:'blur(6px)',border:'1px solid rgba(255,255,255,0.3)'}}>
            {displayMoral}
          </span>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{background:'rgba(0,0,0,0.25)',color:'rgba(255,255,255,0.7)',fontFamily:'var(--font-body)'}}>
            🖼️ {comingSoonLabel}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Story Card ── */
function StoryCard({ story, isActive, onToggle, lang }: {
  story: Story
  isActive: boolean
  onToggle: () => void
  lang: 'en'|'ar'
}) {
  const hasImage = story.hasImage
  const isEn = lang === 'en'
  const displayDesc = isEn ? story.descEn : story.desc
  const displayTitle = isEn ? story.titleEn : story.title
  const displayCategory = isEn ? story.categoryEn : story.category
  const comingSoonLabel = isEn ? 'Coming Soon' : 'قريباً'

  return (
    <div
      className="card cursor-pointer"
      onClick={onToggle}
    >
      <StoryCover story={story} hasImage={hasImage} lang={lang} comingSoonLabel={comingSoonLabel} />

      <div className="p-4">
        <p className="text-xs leading-relaxed" style={{color:'var(--gray-text)',fontFamily:'var(--font-body)'}}>
          {displayDesc}
        </p>

        {isActive && (
          <div className="mt-3 pt-3 border-t" style={{borderColor:'var(--gray-mid)'}}>
            <p className="text-xs mb-3" style={{color:'var(--gray-text)',fontFamily:'var(--font-body)'}}>
              {isEn ? (
                <>The hero of this story will be <strong style={{color:'var(--pink)'}}>your child</strong>! 🌟</>
              ) : (
                <>البطل في هذه القصة سيكون{' '}<strong style={{color:'var(--pink)'}}>طفلك</strong> هو! 🌟</>
              )}
            </p>
            <a
              href={`https://wa.me/971501615994?text=${encodeURIComponent(
                isEn
                  ? `I'd like to order the "${displayTitle}" story from the "${displayCategory}" category for my child`
                  : `أريد طلب قصة "${story.title}" من قسم "${story.category}" لطفلي`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs px-4 py-2 w-full justify-center"
              onClick={e => e.stopPropagation()}
            >
              {isEn ? 'Order This Story ✨' : 'اطلب هذه القصة ✨'}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════
   MAIN CATALOG COMPONENT
══════════════════════════════ */
export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('قيم وأخلاق')
  const [gender, setGender]                 = useState<Gender>('all')
  const [activeStory,   setActiveStory]     = useState<number|null>(null)
  const { lang } = useLanguage()
  const t = translations[lang].catalog
  const isEn = lang === 'en'

  const filtered = stories.filter(s =>
    s.category === activeCategory &&
    (gender === 'all' || s.gender === gender)
  )

  const meta = catMeta[activeCategory]
  const genders = [
    { label: t.all, value: 'all' },
    { label: `👦 ${t.boy}`, value: 'boy' },
    { label: `👧 ${t.girl}`, value: 'girl' },
  ]

  return (
    <section id="catalog" className="py-24" style={{background:'#F7F8FC'}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-eyebrow">{t.eyebrow}</div>
          <h2 className="section-title text-4xl mb-3">{t.title}</h2>
          <div className="section-divider mx-auto"/>
          <p className="text-sm max-w-md mx-auto" style={{color:'var(--gray-text)',fontFamily:'var(--font-body)'}}>
            {t.subtitle}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map(cat => {
            const m = catMeta[cat]
            const active = activeCategory === cat
            return (
              <button key={cat}
                onClick={() => { setActiveCategory(cat); setActiveStory(null) }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200"
                style={{
                  background: active ? m.color    : 'white',
                  color:      active ? 'white'    : m.color,
                  border:     active ? 'none'     : `2px solid ${m.color}30`,
                  boxShadow:  active ? `0 6px 20px ${m.color}40` : '0 2px 8px rgba(0,0,0,0.05)',
                  transform:  active ? 'translateY(-2px)' : 'none',
                  fontFamily: 'var(--font-body)',
                }}>
                <span>{m.icon}</span>
                <span>{isEn ? categoryEnMap[cat] : cat}</span>
              </button>
            )
          })}
        </div>

        {/* Gender filter */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-1 p-1.5 rounded-2xl"
            style={{background:'white',border:'1.5px solid var(--gray-mid)',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
            {genders.map(f => (
              <button key={f.value}
                onClick={() => { setGender(f.value as Gender); setActiveStory(null) }}
                className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: gender===f.value ? 'var(--grad-btn)' : 'transparent',
                  color:      gender===f.value ? 'white'           : 'var(--gray-text)',
                  fontFamily: 'var(--font-body)',
                  boxShadow:  gender===f.value ? '0 4px 12px rgba(255,45,122,0.25)' : 'none',
                }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category strip */}
        <div className="flex items-center gap-3 mb-6 px-5 py-4 rounded-2xl"
          style={{background:meta.bg, border:`1.5px solid ${meta.color}25`}}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{background:`${meta.color}20`}}>
            {meta.icon}
          </div>
          <div>
            <div className="font-tajawal font-black text-lg" style={{color:'var(--navy)'}}>{isEn ? categoryEnMap[activeCategory] : activeCategory}</div>
            <div className="text-xs" style={{color:meta.color,fontFamily:'var(--font-body)'}}>
              {isEn
                ? `${filtered.length} ${filtered.length===1?'story':'stories'}${gender!=='all'?(gender==='boy'?' — for boys':' — for girls'):' — for everyone'}`
                : `${filtered.length} قصة${gender!=='all'?(gender==='boy'?' — للأولاد':' — للبنات'):' — للجميع'}`}
            </div>
          </div>
          <div className="mr-auto flex gap-2">
            {(['boy','girl'] as const).map(g => {
              const cnt = stories.filter(s => s.category===activeCategory && s.gender===g).length
              return (
                <div key={g} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                  style={{background:'white',color:'var(--navy)',fontFamily:'var(--font-body)'}}>
                  {g==='boy'?'👦':'👧'} {cnt}
                </div>
              )
            })}
          </div>

        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((story) => (
            <div key={story.id}>
              <StoryCard
                story={story}
                lang={lang}
                isActive={activeStory===story.id}
                onToggle={() => setActiveStory(activeStory===story.id ? null : story.id)}
              />
            </div>
          ))}
        </div>

        {filtered.length===0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p style={{color:'var(--gray-text)',fontFamily:'var(--font-body)'}}>{t.noResults}</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-sm mb-4" style={{color:'var(--gray-text)',fontFamily:'var(--font-body)'}}>
            {isEn ? 'Can\u2019t find the right story? We\u2019ll write one from scratch for you!' : 'مش لاقي القصة المناسبة؟ نكتبلك واحدة من الصفر!'}
          </p>
          <a href={`https://wa.me/971501615994?text=${encodeURIComponent(isEn ? 'I want a fully custom story for my child' : 'عايز قصة مخصصة بالكامل لطفلي')}`}
            target="_blank" rel="noopener noreferrer" className="btn-primary">
            {isEn ? 'Request a Fully Custom Story ✨' : 'اطلب قصة مخصصة من الصفر ✨'}
          </a>
        </div>

      </div>
    </section>
  )
}
