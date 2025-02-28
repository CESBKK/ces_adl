// Copyright (c) 2025, Cloud Engineering and Services Company Limited and contributors
// For license information, please see license.txt

frappe.ui.form.on('ADL', {
	refresh(frm) {

	},
    setup(frm){
        setup_queationaire(frm);
    },

});

setup_queationaire = (frm) => {
    this.frm = frm;
    frm.q01 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(1) รับประทานอาหารเมื่อเตรียมสํารับไว้ให้เรียบร้อยต่อหน้า',
            fieldname: 'q01',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถตักอาหารเข้าปากได้',
                '1 ตักอาหารเองได้ แต่ต้องมีคนช่วย เช่น ช่วยใช้ช้อนตักเตรียมไห้/ตัดเป็นชิ้นเล็กๆให้',
                '2 ตักอาหารและช่วยตัวเองได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q02 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(2) การล้างหน้า หวีผม แปรงฟัน โกนหนวดในระยะเวลา 24–48 ชั่วโมงที่ผ่านมา',
            fieldname: 'q02',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องการความช่วยเหลือ',
                '1 ทําได้เอง (รวมทั้งที่ทําได้เองถ้าเตรียมอุปกรณ์ไว้ให้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q03 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(3) ลุกนั่งจากที่นอน หรือจากเตียงไปยังเก้าอี้',
            fieldname: 'q03',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถนั่งได้ (นั่งแล้วจะล้มเสมอ) หรือต้องใช้คน 2 คนช่วยกันยกขึ้น',
                '1 ต้องใช้คนแข็งแรงหรือมีทักษะ 1 คน/ใช้คนทั่วไป 2 คนพยุงดันขึ้นมาจึงจะนั่งอยู่ได้',
                '2 ต้องการความช่วยเหลือบ้าง เช่นช่วยพยุงเล็กน้อย/ต้องมีคนดูแลเพื่อความปลอดภัย',
                '3 ทําได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q04 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(4) การใช้ห้องน้ำ',
            fieldname: 'q04',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ช่วยตัวเองไม่ได้',
                '1 ทําเองได้บ้าง ต้องการความช่วยเหลือในบางสิ่ง',
                '2 ช่วยเหลือตัวเองได้ดี'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q05 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(5) การเคลื่อนที่ภายในห้องหรือบ้าน',
            fieldname: 'q05',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 เคลื่อนที่ไปไหนไม่ได้',
                '1 ใช้รถเข็นช่วยให้เคลื่อนที่ได้เอง (ไม่ต้องมีคนเข็นให้) เข้าออกมุมห้องหรือประตูได้',
                '2 เดินหรือเคลื่อนที่โดยมีคนช่วย เช่น พยุง',
                '3 เดินหรือเคลื่อนที่ได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q06 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(6) การสวมใส่เสื้อผ้า',
            fieldname: 'q06',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องมีคนสวมใส่ให้ ช่วยตัวเองแทบไม่ได้หรือได้น้อย',
                '1 ช่วยตัวเองได้ประมาณร้อยละ 50 ที่เหลือต้องมีคนช่วย',
                '2 ช่วยตัวเองได้ดี (รวมทั้งการติดกระดุม รูดซิป ใส่เสื้อผ้าที่ดัดแปลงให้เหมาะสมก็ได้)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q07 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(7) การขึ้นลงบันได 1 ชั้น',
            fieldname: 'q07',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ไม่สามารถทําได้',
                '1 ต้องการคนช่วย',
                '2 ขึ้นลงได้เอง (ถ้าต้องใช้เครื่องช่วยเดิน เช่น Walker จะต้องเอาขึ้นลงได้ด้วย)'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q08 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(8) การอาบน้ำ',
            fieldname: 'q08',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 ต้องมีคนช่วยหรือทําให้',
                '1 อาบน้ำได้เอง'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q09 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(9) การกลั้นการถ่ายอุจจาระ ใน 1 สัปดาห์ที่ผ่านมา',
            fieldname: 'q09',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 กลั้นไม่ได้ หรือต้องการการสวนอุจจาระอยู่เสมอ',
                '1 กลั้นไม่ได้บางครั้ง (ไม่เกิน 1 ครั้งต่อสัปดาห์)',
                '2 กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    frm.q10 = frappe.ui.form.make_control({
        parent: frm.fields_dict.questionaire_data.parent,
        df: {
            label: '(10) การกลั้นปัสสาวะในระยะ 1 สัปดาห์ที่ผ่านมา',
            fieldname: 'q10',
            fieldtype: 'Select',
            reqd: 1,
            options: ['',
                '0 กลั้นไม่ได้ หรือใส่สายสวนปัสสาวะ แต่ไม่สามารถดูแลเองได้',
                '1 กลั้นไม่ได้บางครั้ง (ไม่เกินวันละ 1 ครั้ง)',
                '2 กลั้นได้เป็นปกติ'
            ],
            change: () => {
                on_questionaire_change(frm);
            },
        },
        render_input: true
    });
    // $('[data-fieldname="questionaire_data"]').hide();
}

on_questionaire_change = (frm) => {
    let jsonData = {};
    let i = 0;
    [frm.q01, frm.q02, frm.q03, frm.q04, frm.q05, frm.q06, frm.q07, frm.q08, frm.q09, frm.q10].forEach((item) => {
        if (item.value === null) {
            jsonData[item.df.fieldname] = '';
        }
        else {
            jsonData[item.df.fieldname] = parseInt(item.value.split(' ')[0]);
            i += jsonData[item.df.fieldname];
        }
    });
    jsonData['total'] = i;
    // jsonData = JSON.stringify(jsonData, null, 4);
    jsonData = JSON.stringify(jsonData);
    frm.set_value('questionaire_data', jsonData);
    console.log('ADL Questionaire Data');
    console.log(jsonData);
    frm.dirty();
}
